import { ChangeEvent } from 'react';

/**
 * Creates a new seed randomly and returns it based on the params provided.
 * Tries to randomize as much as it can the random number generation by using
 * a challenge mechanism at each iteration.
 * @function
 * @param dim_length - The length of each dimension
 * @param max_value - The max value/age/state of each cell
 */
export const CreateRandomSeed = (dim_length: number, max_value: number) => {
  // Allocates the seed (also initial generation) buffer/array
  const seed = new Uint8Array(dim_length ** 3);

  for (let i = 0; i < seed.length; i++) {
    // In order to improve randomness each iteration has a challenge mechanism.
    const isZeroThreshold = Math.floor(Math.random() * max_value);
    // If the second random number is greater than the first the one is used to
    // determine a live cell age, else a dead cell (state: 0) is used.
    const randomAge = Math.floor(Math.random() * max_value);
    seed[i] = randomAge <= isZeroThreshold ? randomAge : 0;
  }

  return seed; // Returns the generated seed generation
};

/**
 * Opens an "Upload file" dialog to the user and waits for interaction.
 * Once the file has been chosen, it reads its content and converts the data back
 * to a UInt8Array (the seed format), at last calls the completion callback.
 * @function
 * @param onImportCompleted - Completion callback
 */
export const ImportSeed = (onImportCompleted: (newSeed: Uint8Array) => void) => {
  // Inline function to converts the file content to a UInt8Array (the seed)
  const TextToSeed = (e: ProgressEvent<FileReader>) => {
    // Text to Buffer object
    const buffer = Buffer.from(JSON.parse(e.target?.result as string));
    // Buffer to UInt8Array that is then passed to the callback
    onImportCompleted(new Uint8Array(buffer));
  };

  // Event listener to read a file uploaded by the user
  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.addEventListener('load', TextToSeed);
    reader.readAsText(e.target.files?.item(0) ?? new Blob());
  };

  // Creates a temporary input type file element
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = onFileUpload as any;
  input.accept = 'application/json';

  input.click(); // Opens the dialog on the client
};

/**
 * Exports the given/current seed to JSON file and triggers the download
 * on the user computer.
 * @function
 * @param seed - The seed to export
 */
export const ExportSeed = (seed: Uint8Array) => {
  // Converts the seed to a binary blob
  const jsonSeed = JSON.stringify(Buffer.from(seed));
  const blob = new Blob([jsonSeed], { type: 'application/json' });

  // Creates an anchor (<a>) element with the blob URL as href
  const anchor = document.createElement('a');
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = 'Seed.json';

  anchor.click(); // Triggers the download on the clients
};
