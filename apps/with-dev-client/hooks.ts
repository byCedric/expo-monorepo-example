import { useCallback, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

type MmkvString = ReturnType<MMKV['getString']>;
type MmkvStringSetter = (value?: string) => void;

/**
 * Fetch a value from storage and keep track of it while interacting.
 * Note, this does not update when the value is changed without the setter.
 * This version (1.3.1) of MMKV does not have the value listener.
 */
export function useMmkvString(name: string, storage: MMKV): [MmkvString, MmkvStringSetter] {
  const [value, setValue] = useState<MmkvString>(() => storage.getString(name));

  const setCallback = useCallback<MmkvStringSetter>(
    (newValue) => {
      if (newValue === undefined) {
        storage.delete(name);
        setValue(undefined);
      } else {
        storage.set(name, newValue);
        setValue(newValue);
      }
    },
    [name, storage]
  );

  return [value, setCallback];
}
