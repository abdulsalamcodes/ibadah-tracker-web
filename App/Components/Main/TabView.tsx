import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import IbadahTask from "./IbadahTask";
import { fetchIbadah, toggleCompletion } from "../../Services/Ibadah";
import { Progress } from "./Progress";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

export interface Ibadah {
  _id: string;
  name: string;
  description: string;
  completed: boolean;
  time: string;
}

const FirstRoute = () => {
  const [ibadahList, setIbadahList] = useState<Ibadah[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const data = await fetchIbadah("daily");
      setIbadahList(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleIbadahCompletion = async (ibadahId: string) => {
    try {
      console.log(ibadahId);
      const response = await toggleCompletion(ibadahId);
      console.log(response, "data");
      setIbadahList(
        ibadahList.map((item) => (item._id === ibadahId ? response.data : item))
      );
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
  };

  const completedCount = ibadahList.filter((item) =>
    item?.completionStatus.some(
      (status) =>
        new Date(status.date).toDateString() === new Date().toDateString() &&
        status.completed
    )
  ).length;
  const progressPercentage = (completedCount / ibadahList.length) * 100;

  return (
    <View className="flex flex-1">
      {ibadahList.length >= 1 ? (
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <View className="mb-2">
                <Progress value={progressPercentage} />
                <Text className="text-sm text-gray-600 mt-1">
                  {completedCount} of {ibadahList.length} completed today
                </Text>
              </View>
            </View>
          )}
          data={ibadahList}
          contentContainerStyle={{ paddingTop: 15 }}
          renderItem={({ item }) => (
            <IbadahTask handleDone={toggleIbadahCompletion} ibadah={item} />
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      ) : (
        <View className=" justify-center flex  flex-1  items-center">
          <Text className="text-2xl font-popBoldItalics text-center">
            You haven't added any daily ibadah yet.
          </Text>
          <Text className="text-base font-popRegular">
            Start by adding one to track your progress.
          </Text>
        </View>
      )}
    </View>
  );
};

const SecondRoute = () => {
  const [ibadahList, setIbadahList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchIbadah("weekly");
        console.log(data, "ibadah data");
        setIbadahList(data);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const completedCount = ibadahList.filter((item) =>
    item?.completionStatus.some(
      (status) =>
        new Date(status.date).toDateString() === new Date().toDateString() &&
        status.completed
    )
  ).length;
  const progressPercentage = (completedCount / ibadahList.length) * 100;
  return (
    <View className="   flex flex-1">
      {ibadahList.length >= 1 ? (
        <FlatList
          data={ibadahList}
          ListHeaderComponent={() => (
            <View>
              <View className="mb-2">
                <Progress value={progressPercentage} />
                <Text className="text-sm text-gray-600 mt-1">
                  {completedCount} of {ibadahList.length} completed today
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 15 }}
          renderItem={({ item }) => (
            <IbadahTask handleDone={(id) => console.log(id)} ibadah={item} />
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      ) : (
        <View className=" justify-center flex  flex-1  items-center">
          <Text className="text-2xl font-popBoldItalics text-center">
            You haven't added any weekly ibadah yet.
          </Text>
          <Text className="text-base font-popRegular">
            Start by adding one to track your progress.
          </Text>
        </View>
      )}
    </View>
  );
};

const ThirdRoute = () => {
  const [ibadahList, setIbadahList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchIbadah("monthly");
        console.log(data, "ibadah data");
        setIbadahList(data);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleCompletion = async (ibadahId: string) => {
    try {
      console.log(ibadahId);
      // const response = await ibadahApi.toggleCompletion(ibadahId);
      // setIbadahList(
      //   ibadahList.map((item) => (item._id === ibadahId ? response.data : item))
      // );
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
  };

  return (
    <View className="   flex flex-1">
      {ibadahList.length >= 1 ? (
        <FlatList
          data={ibadahList}
          contentContainerStyle={{ paddingTop: 15 }}
          renderItem={({ item }) => (
            <IbadahTask ibadah={item} handleDone={toggleCompletion} />
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      ) : (
        <View className=" justify-center flex  flex-1  items-center">
          <Text className="text-2xl font-popBoldItalics text-center">
            You haven't added any monthly ibadah yet.
          </Text>
          <Text className="text-base font-popRegular">
            Start by adding one to track your progress.
          </Text>
        </View>
      )}
    </View>
  );
};

const renderScene = SceneMap({
  daily: FirstRoute,
  weekly: SecondRoute,
  monthly: ThirdRoute,
});

const routes = [
  { key: "daily", title: "Daily" },
  { key: "weekly", title: "Weekly" },
  { key: "monthly", title: "Monthly" },
];

export default function IbadahList() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: 300 }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#4ade80" }}
          style={{ backgroundColor: "#a1a1aa" }}
        />
      )}
    />
  );
}
