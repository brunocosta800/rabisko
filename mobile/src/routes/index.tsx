import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Simulacao } from "../screens/Simulacao";

const Stack = createNativeStackNavigator();

export function Routes() {
    return (
        <Stack.Navigator initialRouteName="Simulacao">
            <Stack.Screen name="Simulacao" component={Simulacao} />
        </Stack.Navigator>
    );
}
