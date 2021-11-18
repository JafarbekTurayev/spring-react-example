package atmos.newsapp.controller;

import atmos.newsapp.entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    ClientService clientService;

    @GetMapping("/list")
    public HttpEntity<?> clients() {
        return ResponseEntity.ok(clientRepository.findAll());
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable Integer id) {
        Optional byId = clientRepository.findById(id);
        if (!byId.isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse("Not Found!", false));
        return ResponseEntity.ok(new ApiResponse("Found!", true, byId.get()));
    }

    @PostMapping("/add")
    public ApiResponse add(@RequestBody Client client) {
        return clientService.add(client);
    }

    @PutMapping("/edit/{id}")
    public ApiResponse edit(@PathVariable Integer id, @Valid @RequestBody Client client) {
        return clientService.edit(id, client);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable Integer id) {
        Optional<Client> byId = clientRepository.findById(id);
        if (!byId.isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse("Not Found!", false));
        clientRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse("Deleted!", true));
    }
}
