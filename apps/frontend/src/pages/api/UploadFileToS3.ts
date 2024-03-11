import { FileWithPath } from "@mantine/dropzone";

export default async function uploadFileToS3(
  presignedUrl: URL,
  file: FileWithPath[][0],
  MIME: string
) {
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT", // Use PUT method for uploading to a pre-signed URL
      body: file, // The file to upload
      headers: {
        "Content-Type": MIME, // Or the correct MIME type of your file
      },
    });

    if (response.ok) {
      console.log("File uploaded successfully");
    } else {
      throw new Error(
        `Server responded with ${response.status}: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Upload failed:", error);
  }
}
