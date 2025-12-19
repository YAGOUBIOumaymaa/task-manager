package com.example.demo.dto;

public class ProjectProgressDTO {

    private int totalTasks;
    private int completedTasks;
    private int progress;

    public ProjectProgressDTO(int totalTasks, int completedTasks) {
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.progress = totalTasks == 0
                ? 0
                : (completedTasks * 100) / totalTasks;
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public int getCompletedTasks() {
        return completedTasks;
    }

    public int getProgress() {
        return progress;
    }
}


