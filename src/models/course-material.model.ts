// type MaterialType = "document" | "images" | "videos";

enum MaterialType {
  Document = "document",
  Video = "video",
}

/**
 * Material associated with a specific course
 */
export interface CourseMaterial {
  id: string;
  name: string;
  file: string;
  type: string;
}
