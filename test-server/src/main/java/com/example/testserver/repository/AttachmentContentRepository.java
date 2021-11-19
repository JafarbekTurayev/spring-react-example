package com.example.testserver.repository;

import com.example.testserver.entity.Attachment;
import com.example.testserver.entity.AttachmentContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttachmentContentRepository extends JpaRepository<AttachmentContent, Integer> {
    Optional<AttachmentContent> findByAttachmentId(Integer integer);

    Optional<AttachmentContent> findByAttachment(Attachment attachment);
}
