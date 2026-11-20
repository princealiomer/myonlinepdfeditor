"use client";

type FileDropzoneProps = {
  accept?: string;
  multiple?: boolean;
  files: File[];
  onFiles: (files: File[]) => void;
  label?: string;
  hint?: string;
  dropLabel?: string;
  browseLabel?: string;
  removeLabel?: string;
};

export function FileDropzone({
  accept,
  multiple = false,
  files,
  onFiles,
  label = "Select a document",
  hint = "PDF and supported files stay on your device",
  dropLabel = "Drag and drop here",
  browseLabel = "or click to browse",
  removeLabel = "Remove",
}: FileDropzoneProps) {
  return (
    <form
      className="surface rounded-2xl p-5"
      aria-labelledby="upload-heading"
      onSubmit={(event) => event.preventDefault()}
    >
      <h2 id="upload-heading" className="text-lg font-semibold">
        {label}
      </h2>
      <p className="mt-1 text-sm text-muted">{hint}</p>

      <label
        className="dropzone-target mt-4 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-mist bg-paper px-4 py-8 text-center transition active:border-teal sm:min-h-44 sm:py-10"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const list = Array.from(event.dataTransfer.files || []);
          if (!list.length) return;
          onFiles(multiple ? [...files, ...list] : [list[0]]);
        }}
      >
        <span className="font-semibold text-ink">{dropLabel}</span>
        <span className="mt-1 text-sm text-muted">{browseLabel}</span>
        <input
          className="sr-only"
          type="file"
          name="document"
          accept={accept}
          multiple={multiple}
          onChange={(event) => {
            const list = Array.from(event.target.files || []);
            if (!list.length) return;
            onFiles(multiple ? [...files, ...list] : [list[0]]);
            event.currentTarget.value = "";
          }}
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 rounded-lg bg-paper px-3 py-2.5"
            >
              <span className="min-w-0 truncate font-medium">{file.name}</span>
              <button
                type="button"
                className="btn btn-ghost min-h-11 shrink-0 px-3 py-2 text-sm"
                onClick={() =>
                  onFiles(files.filter((_, fileIndex) => fileIndex !== index))
                }
              >
                {removeLabel}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
