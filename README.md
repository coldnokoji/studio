# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Firebase Storage CORS Setup (Required for Image Uploads)

To enable image uploads from the admin panel, you need to apply a CORS configuration to your Firebase Storage bucket. This is a one-time setup.

**Prerequisites:**
1.  [Install the Google Cloud CLI](https://cloud.google.com/sdk/docs/install) on your local machine.
2.  Authenticate with Google Cloud by running: `gcloud auth login`

**Steps:**

1.  **Find your Storage Bucket ID:**
    *   Go to your Firebase Console.
    *   Navigate to **Storage**.
    *   Your bucket ID is at the top, usually in the format `gs://<your-project-id>.appspot.com`.
    *   Copy the bucket ID (e.g., `gs://shreyashkar-fb174.appspot.com`).

2.  **Apply the CORS configuration:**
    *   Open your local terminal.
    *   Run the following command, replacing `<YOUR_BUCKET_ID>` with the ID you copied in the previous step:
        ```bash
        gcloud storage buckets update <YOUR_BUCKET_ID> --cors-file=./cors.json
        ```
    *   For example:
        ```bash
        gcloud storage buckets update gs://shreyashkar-fb174.appspot.com --cors-file=./cors.json
        ```

After running this command, your image uploads should work correctly.
