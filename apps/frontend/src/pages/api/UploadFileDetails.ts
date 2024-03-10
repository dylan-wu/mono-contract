import { FileWithPath } from "@mantine/dropzone";

export default async function uploadFileDetails(
  fileName: FileWithPath,
  companyName: String | undefined
) {
  const url =
    "https://pnvc9fhceb.execute-api.us-east-1.amazonaws.com/dev/upload";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: companyName,
        fileName: fileName.name,
      }),
    });

    if (!response.ok) throw new Error("Network response was not ok.");

    const result = await response.json();
    console.log("Success:", result);
    return result.url;
  } catch (error) {
    console.error("Error:", error);
  }
}
