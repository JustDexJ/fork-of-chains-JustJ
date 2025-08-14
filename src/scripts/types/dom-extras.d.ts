//
// Declares types for browser APIs or other JS stuff
// which is not yet included in the default lib.
//

declare global {
  interface Window {
    showDirectoryPicker: (options?: {
      id?: string;
      mode?: "read" | "readwrite";
      startIn?: string;
    }) => Promise<FileSystemDirectoryHandle>;

    showSaveFilePicker: (options?: any) => Promise<FileSystemFileHandle>;
  }

  interface FileSystemDirectoryHandle {
    entries(): AsyncIterator<[key: string, value: FileSystemHandle]>;
  }
}

export {}; // (needed to make this file a module)
