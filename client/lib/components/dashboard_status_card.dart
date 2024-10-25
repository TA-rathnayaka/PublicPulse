import 'package:flutter/material.dart';
import 'package:client/constants/dash_board_status_card_constants.dart';


class DashBoardStatusCard extends StatelessWidget {
  final int activeCount;
  final int endedCount;
  final int recentCount;
  final int dormantCount;

  const DashBoardStatusCard({
    Key? key,
    required this.activeCount,
    required this.endedCount,
    required this.recentCount,
    required this.dormantCount,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [
              kCardGradientStartColorDashBoardStatusCard,
              kCardGradientEndColorDashBoardStatusCard
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(
                  Icons.hourglass_bottom_sharp,
                  color: kIconColorDashBoardStatusCard,
                  size: 32,
                ),
                const SizedBox(width: 12),
                const Text(
                  'Going on Poles',
                  style: TextStyle(
                    color: kTitleTextColorDashBoardStatusCard,
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildCountColumn(activeCount, 'Active'),
                _buildCountColumn(endedCount, 'Ended'),
                _buildCountColumn(recentCount, 'Recent'),
                _buildCountColumn(dormantCount, 'Dormant'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Column _buildCountColumn(int count, String label) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          count.toString(),
          style: const TextStyle(
            color: kIconColorDashBoardStatusCard,
            fontSize: 40,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: const TextStyle(
            color: kLabelTextColorDashBoardStatusCard,
            fontSize: 20,
          ),
        ),
      ],
    );
  }
}
