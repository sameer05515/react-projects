package com.tweetapp.service;

import com.tweetapp.model.Link;
import com.tweetapp.repository.LinkRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LinkService {
    
    @Autowired
    private LinkRepository linkRepository;
    
    public List<Link> getAllLinks() {
        return linkRepository.findAll();
    }
    
    public Link getLinkByUniqueId(String uniqueId) {
        return linkRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public Link createLink(Map<String, Object> linkData) {
        Link link = new Link();
        link.setUniqueId(UuidUtil.generateUuid());
        link.setName((String) linkData.get("name"));
        link.setLinkType((String) linkData.get("linkType"));
        link.setLinkUrl((String) linkData.get("linkUrl"));
        link.setDescription((String) linkData.get("description"));
        link.setParentId(linkData.get("parentId") != null ? (String) linkData.get("parentId") : "");
        return linkRepository.save(link);
    }
    
    public Link updateLinkByUniqueId(String uniqueId, Map<String, Object> linkData) {
        Optional<Link> optionalLink = linkRepository.findByUniqueId(uniqueId);
        if (optionalLink.isPresent()) {
            Link link = optionalLink.get();
            if (linkData.containsKey("name")) link.setName((String) linkData.get("name"));
            if (linkData.containsKey("linkType")) link.setLinkType((String) linkData.get("linkType"));
            if (linkData.containsKey("linkUrl")) link.setLinkUrl((String) linkData.get("linkUrl"));
            if (linkData.containsKey("description")) link.setDescription((String) linkData.get("description"));
            if (linkData.containsKey("parentId")) link.setParentId((String) linkData.get("parentId"));
            return linkRepository.save(link);
        }
        return null;
    }
    
    public boolean deleteLinkByUniqueId(String uniqueId) {
        Optional<Link> optionalLink = linkRepository.findByUniqueId(uniqueId);
        if (optionalLink.isPresent()) {
            linkRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
    
    public List<Link> searchLinks(String searchString) {
        return linkRepository.findAll().stream()
                .filter(link -> link.getName() != null && link.getName().toLowerCase().contains(searchString.toLowerCase()))
                .collect(java.util.stream.Collectors.toList());
    }
}

