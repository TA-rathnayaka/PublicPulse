import 'package:client/models/poll.dart';

final List<Poll> pollsList = [
  Poll(
    title: "Government Healthcare Policy",
    description: "Vote for your stance on healthcare reforms",
    imageUrl:
        "https://as2.ftcdn.net/v2/jpg/02/29/51/37/1000_F_229513787_8XjaId5E9g3DYxHNialX7xUr0pppLXLJ.jpg",
    options: [
      {"Yes": 0},
      {"No": 0},
      {"Undecided": 0},
    ],
    createDate: DateTime.now(),
    duration: const Duration(days: 7),
  ),
  Poll(
    title: "Education Budget Allocation",
    description: "Do you agree with the proposed budget?",
    imageUrl:
        "https://st.depositphotos.com/1035837/2529/i/950/depositphotos_25297479-stock-photo-book.jpg",
    options: [
      {"Agree": 0},
      {"Disagree": 0},
      {"Neutral": 0},
    ],
    createDate: DateTime.now(),
    duration: const Duration(days: 7),
  ),
  Poll(
    title: "Climate Change Initiative",
    description: "Share your opinion on climate policies",
    imageUrl:
        "https://as2.ftcdn.net/v2/jpg/04/55/80/19/1000_F_455801976_uLPtRjktfqyp0h6gML7tsrt1SOAuikKw.jpg",
    options: [
      {"Support": 0},
      {"Oppose": 0},
      {"No Opinion": 0},
    ],
    createDate: DateTime.now(),
    duration: const Duration(days: 7),
  ),
  Poll(
    title: "Tax Reform Proposal",
    description: "Do you support the new tax policies?",
    imageUrl: "https://example.com/tax.jpg",
    options: [
      {"Yes": 0},
      {"No": 0},
    ],
    createDate: DateTime.now(),
    duration: const Duration(days: 7),
  ),
  Poll(
    title: "Public Transportation Funding",
    description: "Your input on the transportation budget",
    imageUrl: "https://example.com/transport.jpg",
    options: [
      {"Increase Funding": 0},
      {"Maintain Funding": 0},
      {"Decrease Funding": 0},
    ],
    createDate: DateTime.now(),
    duration: const Duration(days: 7),
  ),
];
