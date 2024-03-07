import { FileWithPath } from "@mantine/dropzone";

export default async function uploadFileDetails(
  fileName: FileWithPath,
  companyName: String
) {
  const url =
    "https://pnvc9fhceb.execute-api.us-east-1.amazonaws.com/dev/upload";
  const data = { fileName, companyName };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Network response was not ok.");

    const result = await response.json();
    console.log("Success:", result);
    return result.url;
  } catch (error) {
    console.error("Error:", error);
  }
}
