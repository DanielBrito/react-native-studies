import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MoodOptionType, MoodOptionWithTimestamp } from './types';

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

const storageKey = 'my-app-data';

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const setAppData = async (appData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(appData));
  } catch (error) {
    console.log(error);
  }
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};
const AppContext = React.createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  React.useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setMoodList(data.moods);
      }
    };

    getDataFromStorage();
  }, []);

  const handleSelectMood = React.useCallback((mood: MoodOptionType) => {
    setMoodList(current => {
      const newValue = [...current, { mood, timestamp: Date.now() }];

      setAppData({ moods: newValue });

      return newValue;
    });
  }, []);

  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
