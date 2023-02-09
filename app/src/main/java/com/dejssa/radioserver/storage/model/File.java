package com.dejssa.radioserver.storage.model;

public class File {
    private String name;
    private String content;
    private byte[] bytes;

    public File(String name, String content, byte[] bytes) {
        this.name = name.replace("web/", "");
        this.content = content;
        this.bytes = bytes;
    }

    public String getName() {
        return name;
    }

    public String getContent() {
        return content;
    }

    public byte[] getBytes() {
        return bytes;
    }
}
