import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login';
import Menu from './Menu';
import AddExpense from './AddExpense';
import listTrip from './ListTrip';
import closeTrip from './CloseTrip';

/*Navigator page to change screens*/
const navigator = (createStackNavigator(
  {
    One: Login,
    Two: Menu,
    Three: AddExpense,
    Four: listTrip,
    Five: closeTrip
  },
  {
    initialRouteName: 'One',
    defaultNavigationOptions: {
      title: 'Splittr',
      headerTintColor: '#fdfaf6',
      headerStyle: {
        backgroundColor: '#064420',
      },
      backgroundColor: '#e4efe7'
    },
  }
));

export default createAppContainer(navigator);