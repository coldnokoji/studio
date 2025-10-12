
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, XCircle } from 'lucide-react';

interface ImageUploaderProps {
  name: string;
  initialImageUrl?: string | null;
}

export function ImageUploader({ name, initialImageUrl }: ImageUploaderProps) {
  const { setValue, watch } = useFormContext();
  const currentImageUrl = watch(name, initialImageUrl || '');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File is too large. Please select an image under 5MB.');
      return;
    }
    setError(null);
    setUploadProgress(0);

    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        setError('Upload failed. Please try again.');
        setUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValue(name, downloadURL, { shouldValidate: true, shouldDirty: true });
          setUploadProgress(null);
        });
      }
    );
  };

  const clearImage = () => {
    setValue(name, '', { shouldValidate: true, shouldDirty: true });
  }

  return (
    <div className="space-y-4">
      {currentImageUrl && (
        <div className="relative w-full max-w-sm aspect-video rounded-md overflow-hidden border">
          <Image src={currentImageUrl} alt="Uploaded preview" fill className="object-contain" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 rounded-full"
            onClick={clearImage}
            type="button"
          >
            <XCircle className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      )}
      
      {!currentImageUrl && (
         <div className="flex items-center gap-4">
          <Input id={`file-upload-${name}`} type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif, image/webp" className="hidden" />
          <Button asChild variant="outline">
            <label htmlFor={`file-upload-${name}`} className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </label>
          </Button>
        </div>
      )}

      {uploadProgress !== null && (
        <div className="space-y-1">
          <Progress value={uploadProgress} />
          <p className="text-xs text-muted-foreground">{Math.round(uploadProgress)}% uploaded</p>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
