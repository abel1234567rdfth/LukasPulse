"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | undefined;
  onchange: (files: File[]) => void;
};

const FileUploader = ({ files, onchange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onchange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src={"/assets/icons/upload.svg"}
            width={40}
            height={40}
            alt="upload"
          />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="file-upload_label">
              <p className="text-14-regular">
                <span className="text-purple-500">Click to Upload</span> or drag
                and drop
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default FileUploader;
