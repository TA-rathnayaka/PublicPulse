import 'package:client/Providers/polls_provider.dart';
import 'package:client/views/screens/_all.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:client/config/app_routes.dart';
import 'package:client/config/app_theme.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/navigator_provider.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:client/models/user.dart';
import 'package:client/models/poll.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<PollsProvider>(create: (context) => PollsProvider()),
        ChangeNotifierProvider(create: (context) => MyAuthProvider())// Add your additional providers here
        // Add more providers as needed
      ],
      child: MaterialApp(
        theme: KLightTheme,
        routes: routes,
      ),
    );
  }
}

//import 'package:animate_do/animate_do.dart';
//import 'package:client/providers/poll_screen_provider.dart';
//import 'package:flutter/material.dart';
//import 'package:client/views/screens/test.dart';
//
//import 'package:flutter/material.dart';
//import 'package:provider/provider.dart';
//import 'providers/polls_provider.dart'; // Import your PollsProvider
//import 'package:client/views/screens/test.dart';      // Import your PollScreen
//
//void main() => runApp(
//  MultiProvider(
//    providers: [
//      ChangeNotifierProvider(create: (context) => PollScreenProvider()),
//      // Add additional providers here if needed
//    ],
//    child: MaterialApp(
//      debugShowCheckedModeBanner: false,
//      home: PollScreen(question: "this is the question", pollImages: ["https://img.freepik.com/free-photo/side-view-smiley-couple-indoors_23-2149903726.jpg?t=st=1733576170~exp=1733579770~hmac=3977e1fc2b3df0c0b258b83d954cc052d2159abf463730282592a92f6e96c904&w=1800"], votes: "10",description: "this is the description",),
//    ),
//  ),
//);
//
// class HomePage extends StatefulWidget {
//   @override
//   _HomePageState createState() => _HomePageState();
// }
//
// class _HomePageState extends State<HomePage> {
//   final List<List<String>> products = [
//     ['images/watch-1.jpg', 'Hugo Boss Oxygen', '100 \$'],
//     ['images/watch-2.jpg', 'Hugo Boss Signature', '120 \$'],
//     ['images/watch-3.jpg', 'Casio G-Shock Premium', '80 \$']
//   ];
//
//   int currentIndex = 0;
//
//   void _next() {
//     setState(() {
//       if (currentIndex < products.length - 1) {
//         currentIndex++;
//       } else {
//         currentIndex = currentIndex;
//       }
//     });
//   }
//
//   void _preve() {
//     setState(() {
//       if (currentIndex > 0) {
//         currentIndex--;
//       } else {
//         currentIndex = 0;
//       }
//     });
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: SingleChildScrollView(
//         child: Container(
//           color: Colors.white,
//           child: Column(
//             children: <Widget>[
//               GestureDetector(
//                 onHorizontalDragEnd: (DragEndDetails details) {
//                   if (details.velocity.pixelsPerSecond.dx > 0) {
//                     _preve();
//                   } else if (details.velocity.pixelsPerSecond.dx < 0) {
//                     _next();
//                   }
//                 },
//                 child: FadeInUp(
//                     duration: Duration(milliseconds: 800),
//                     child: Container(
//                       width: double.infinity,
//                       height: 300,
//                       decoration: BoxDecoration(
//                           image: DecorationImage(
//                               image: AssetImage(products[currentIndex][0]),
//                               fit: BoxFit.cover)),
//                       child: Container(
//                         decoration: BoxDecoration(
//                             gradient: LinearGradient(
//                                 begin: Alignment.bottomRight,
//                                 colors: [
//                                   Colors.grey.shade700.withOpacity(.9),
//                                   Colors.grey.withOpacity(.0),
//                                 ])),
//                         child: Column(
//                           mainAxisAlignment: MainAxisAlignment.end,
//                           children: <Widget>[
//                             FadeInUp(
//                                 duration: Duration(milliseconds: 1000),
//                                 child: Container(
//                                   width: 140,
//                                   margin: EdgeInsets.only(bottom: 70),
//                                   child: Row(
//
//                                     children: _buildIndicator(),
//                                   ),
//                                 ))
//                           ],
//                         ),
//                       ),
//                     )),
//               ),
//               // Lift the bottom sheet container higher with round corners
//               Transform.translate(
//                 offset: Offset(0, -40),
//                 child: FadeInUp(
//                     duration: Duration(milliseconds: 1000),
//                     child: ClipRRect(
//                       borderRadius: BorderRadius.only(
//                         topLeft: Radius.circular(30),
//                         topRight: Radius.circular(30),
//                       ),
//                       child: Container(
//                         width: double.infinity,
//                         padding: EdgeInsets.all(30),
//                         decoration: BoxDecoration(
//                           color: Colors.white,
//                         ),
//                         child: Column(
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                           children: <Widget>[
//                             Column(
//                               children: [
//                                 FadeInUp(
//                                     duration: Duration(milliseconds: 1300),
//                                     child: Text(
//                                       products[currentIndex][1],
//                                       style: TextStyle(
//                                           color: Colors.grey[800],
//                                           fontSize: 40,
//                                           fontWeight: FontWeight.bold),
//                                     )),
//                                 SizedBox(
//                                   height: 15,
//                                 ),
//                                 FadeInUp(
//                                     duration: Duration(milliseconds: 1500),
//                                     child: Text(
//                                       products[currentIndex][2],
//                                       style: TextStyle(
//                                           color: Colors.yellow[700],
//                                           fontWeight: FontWeight.bold,
//                                           fontSize: 20),
//                                     )),
//                                 SizedBox(
//                                   height: 15,
//                                 ),
//                               ],
//                             ),
//                             FadeInUp(
//                                 duration: Duration(milliseconds: 1700),
//                                 child: MaterialButton(
//                                   onPressed: () {},
//                                   height: 45,
//                                   color: Colors.yellow[700],
//                                   shape: RoundedRectangleBorder(
//                                       borderRadius: BorderRadius.circular(8)),
//                                   child: Center(
//                                     child: Text(
//                                       "Up Vote",
//                                       style: TextStyle(fontWeight: FontWeight.bold),
//                                     ),
//                                   ),
//                                 )),
//                           ],
//                         ),
//                       ),
//                     )),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
//
//   Widget _indicator(bool isActive) {
//     return Container(
//       width:  40,  // Larger width for active indicator, smaller for inactive
//       height: 10,
//       margin: EdgeInsets.only(right: 5),
//       decoration: BoxDecoration(
//         borderRadius: BorderRadius.circular(30),
//         color: isActive ? Colors.grey[800] : Colors.white,
//       ),
//
//     );
//   }
//
//   List<Widget> _buildIndicator() {
//     List<Widget> indicators = [];
//     for (int i = 0; i < products.length; i++) {
//       // Add the active indicator text to the one that's currently active
//       if (currentIndex == i) {
//         indicators.add(_indicator(true));  // Adjust the text for active
//       } else {
//         indicators.add(_indicator(false));  // Empty text for inactive
//       }
//     }
//     return indicators;
//   }}