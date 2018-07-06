This is a temporary solution until AngularFire2 is fixed.....

Move this file and over-write it in

To Make SSR Work:

Just overwrite the 'firebase.app.module.js' in this directory
with the one located in 'node_modules\angularfire2\firebase.app.module.js'

The Workaround:

I changed the import for firebase from import * as firebase from 'firebase/app';

to...

import { firebase } from '@firebase/app';
import 'firebase/app';
