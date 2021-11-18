package com.example.testserver.controller;

import com.example.testserver.entity.Attachment;
import com.example.testserver.entity.AttachmentContent;
import com.example.testserver.payload.ApiResponse;
import com.example.testserver.repository.AttachmentContentRepository;
import com.example.testserver.repository.AttachmentRepository;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Iterator;
import java.util.Optional;

@RestController
@RequestMapping("/attachment")
public class AttachmentController {
    final
    AttachmentRepository attachmentRepository;
    final
    AttachmentContentRepository attachmentContentRepository;
    private static final String uploadDirectorys = "files";

    public AttachmentController(AttachmentRepository attachmentRepository, AttachmentContentRepository attachmentContentRepository) {
        this.attachmentRepository = attachmentRepository;
        this.attachmentContentRepository = attachmentContentRepository;
    }

    @PostMapping("/upload")
    public ApiResponse saveToDb(MultipartHttpServletRequest request) throws IOException {
        Iterator<String> fileNames = request.getFileNames();
        MultipartFile file = request.getFile(fileNames.next());
        if (file != null) {
            Attachment attachment = new Attachment();
            attachment.setOriginalName(file.getOriginalFilename());
            attachment.setSize(file.getSize());
            attachment.setContentType(file.getContentType());
            Attachment save = attachmentRepository.save(attachment);
            AttachmentContent attachmentContent = new AttachmentContent();
            attachmentContent.setAttachment(save);
            attachmentContent.setBytes(file.getBytes());
            attachmentContentRepository.save(attachmentContent);
            return new ApiResponse("Saved !", true, attachment);
        }
        return new ApiResponse("Error upload file!", false);
    }

    @GetMapping("/download/{id}")
    public void getFromDb(@PathVariable Integer id, HttpServletResponse response) throws IOException {
        Optional<Attachment> optionalAttachment = attachmentRepository.findById(id);
        if (optionalAttachment.isPresent()) {
            Attachment attachment = optionalAttachment.get();
            Optional<AttachmentContent> optionalAttachmentContent = attachmentContentRepository.findByAttachmentId(id);
            if (optionalAttachmentContent.isPresent()) {
                AttachmentContent attachmentContent = optionalAttachmentContent.get();
                response.setContentType(attachment.getContentType());
                response.setHeader("Content-Disposition", attachment.getOriginalName() + "/:" + attachment.getSize());
                FileCopyUtils.copy(attachmentContent.getBytes(), response.getOutputStream());
            }

        }
    }

    @GetMapping("/info/{id}")
    public ApiResponse getOne(@PathVariable Integer id) {
        Optional<Attachment> byId = attachmentRepository.findById(id);
        return byId.map(attachment -> new ApiResponse("FOUND", true, attachment)).orElseGet(() -> new ApiResponse("NOT FOUND", false));
    }

    @GetMapping("/info")
    public ApiResponse getOne() {
        return new ApiResponse("FOUND", true, attachmentRepository.findAll());
    }

}
