import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login';
import Menu from './Menu';
import AddExpense from './AddExpense';
import listTrip from './listTrip';
import closeTrip from './closeTrip';

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
    },
  }
));

export default createAppContainer(navigator);