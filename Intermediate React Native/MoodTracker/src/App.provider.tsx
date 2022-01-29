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
  handleDeleteMood: (moodToDelete: MoodOptionWithTimestamp) => void;
};

const AppContext = React.createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
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
      const newMoodList = [...current, { mood, timestamp: Date.now() }];

      setAppData({ moods: newMoodList });

      return newMoodList;
    });
  }, []);

  const handleDeleteMood = React.useCallback(
    (mood: MoodOptionWithTimestamp) => {
      setMoodList(current => {
        const newMoodList = current.filter(
          item => item.timestamp !== mood.timestamp,
        );
        setAppData({ moods: newMoodList });
        return newMoodList;
      });
    },
    [],
  );

  return (
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
