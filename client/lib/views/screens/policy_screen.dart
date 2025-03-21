import 'package:flutter/material.dart';
import 'package:client/models/policy.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/providers/comment_provider.dart';
import 'package:client/models/comment.dart';
import 'package:client/providers/user_provider.dart';
import 'package:provider/provider.dart';


class PolicyScreen extends StatelessWidget {
  static String id = '/policy-screen';
  final Policy policy;

  const PolicyScreen({super.key, required this.policy});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                PolicyCarousel(
                  images: policy.imageUrl != null ? [policy.imageUrl!] : [],
                ),
                Transform.translate(
                  offset: const Offset(0, -40),
                  child: Container(
                    decoration: BoxDecoration(
                        color: theme.scaffoldBackgroundColor,
                        borderRadius: const BorderRadius.only(
                            topRight: Radius.circular(20),
                            topLeft: Radius.circular(20))),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 20, vertical: 30),
                      child: FadeInUp(
                        duration: const Duration(milliseconds: 800),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              policy.title,
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                                color: theme.primaryColor,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              policy.category,
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                                color: theme.textTheme.bodyLarge!.color!
                                    .withOpacity(0.7),
                              ),
                            ),

                            const SizedBox(height: 16),
                            Text(
                              policy.description,
                              style: TextStyle(
                                fontSize: 16,
                                color: theme.textTheme.bodyLarge!.color,
                                height: 1.5,
                              ),
                            ),
                            const SizedBox(height: 16),
                            Wrap(
                              spacing: 8,
                              runSpacing: 4,
                              children: [
                                ...policy.tags.take(5).map((tag) {
                                  return Chip(
                                    label: Text(
                                      tag,
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                    backgroundColor:
                                        theme.primaryColor.withOpacity(0.1),
                                  );
                                }),
                                if (policy.tags.length > 5)
                                  Chip(
                                    label: Text(
                                      'More',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: Colors.white,
                                      ),
                                    ),
                                    backgroundColor:
                                        theme.primaryColor.withOpacity(0.7),
                                  ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            ExpansionTile(
                              title: Align(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  'More Details',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: theme.primaryColor,
                                  ),
                                ),
                              ),
                              children: [
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 8.0),
                                    child: Text(
                                      'Created on: ${policy.createdDate.toLocal().toString().split(' ')[0]}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                  ),
                                ),
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 8.0),
                                    child: Text(
                                      'Effective from: ${policy.effectiveDate?.toLocal().toString().split(' ')[0] ?? 'Not Set'}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                  ),
                                ),
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 8.0),
                                    child: Text(
                                      'Expiry Date: ${policy.expiryDate?.toLocal().toString().split(' ')[0] ?? 'No Expiry'}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                  ),
                                ),
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 8.0),
                                    child: Text(
                                      'Approval Date: ${policy.approvalDate?.toLocal().toString().split(' ')[0] ?? 'Not Approved'}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 20),
                            Downloads(documentUrl: policy.pdfUrl),
                            Padding(
                              padding: const EdgeInsets.symmetric(vertical: 20),
                              child: FadeInUp(
                                duration: const Duration(milliseconds: 1000),
                                child: PrimaryButton(
                                  label: 'Close',
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                ),
                              ),
                            ),

                            const SizedBox(height: 16),
                            // Added spacing between title and content
                        FadeInUp(
                          duration: const Duration(milliseconds: 800),
                            child:_buildCommentsSection(policy, context, theme)),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

Widget _buildCommentsSection(Policy policy, BuildContext context, ThemeData theme) {
  return Consumer<CommentProvider>(
    builder: (context, provider, child) {
      // Use a stateful builder approach
      return StatefulBuilder(
        builder: (context, setState) {
          final TextEditingController commentController = TextEditingController();
          final userProvider = Provider.of<UserProvider>(context, listen: false);
          final currentUserId = userProvider.getCurrentUserDetails();

          // Improved send function with validation
          void handleSendComment() {
            final commentText = commentController.text.trim();
            if (commentText.isNotEmpty) {
              provider.addComment(policy.id, commentText, context, theme);
              commentController.clear();
              // Dismiss keyboard after sending
              FocusScope.of(context).unfocus();
            }
          }

          return Container(
            height: 400,
            padding: const EdgeInsets.symmetric(vertical: 12.0),
            child: Column(
              children: [
                // Header
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Comments',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: theme.colorScheme.primary,
                        ),
                      ),

                    ],
                  ),
                ),

                // Divider
                Divider(height: 1, thickness: 0.5, color: theme.dividerColor),

                // Comments list
                Expanded(
                  child: StreamBuilder<List<Comment>>(
                    stream: provider.getComments(policy.id),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return const Center(
                          child: CircularProgressIndicator(), // Standard loader
                        );
                      }

                      if (snapshot.hasError) {
                        return Center(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(
                                Icons.error_outline,
                                color: theme.colorScheme.error,
                                size: 24,
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Unable to load comments',
                                style: TextStyle(color: theme.colorScheme.error),
                              ),
                            ],
                          ),
                        );
                      }

                      final comments = snapshot.data ?? [];

                      if (comments.isEmpty) {
                        return Center(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(
                                Icons.chat_bubble_outline,
                                color: theme.colorScheme.onSurface.withOpacity(0.4),
                                size: 36,
                              ),
                              const SizedBox(height: 12),
                              Text(
                                'No comments yet',
                                style: TextStyle(
                                  color: theme.colorScheme.onSurface.withOpacity(0.6),
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        );
                      }

                      return ListView.builder(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                        itemCount: comments.length,
                        itemBuilder: (context, index) {
                          return _buildCommentBubble(
                            comment: comments[index],
                            isCurrentUser: comments[index].userId == currentUserId,
                            theme: theme,
                            onDelete: () => provider.removeComment(comments[index].commentId, context),
                            context: context,
                          );
                        },
                      );
                    },
                  ),
                ),

                // Input bar with shadow separator
                Container(

                  padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Expanded(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(14),
                          child: Container(
                            decoration: BoxDecoration(
                              color: theme.colorScheme.surface,
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(
                                color: theme.colorScheme.onSurface.withOpacity(0.1),
                              ),
                            ),
                            child: TextField(
                              controller: commentController,
                              style: TextStyle(
                                color: theme.colorScheme.onSurface,
                                fontSize: 14,
                              ),
                              decoration: InputDecoration(
                                hintText: 'Add a comment...',
                                hintStyle: TextStyle(
                                  color: theme.colorScheme.onSurface.withOpacity(0.5),
                                ),
                                border: InputBorder.none,
                                contentPadding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                  vertical: 10,
                                ),
                                isDense: true,
                              ),
                              maxLines: 5,
                              minLines: 1,
                              textCapitalization: TextCapitalization.sentences,
                              keyboardType: TextInputType.text,
                              textInputAction: TextInputAction.send,
                              onSubmitted: (_) => handleSendComment(),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Material(
                        color: Colors.transparent,
                        child: InkWell(
                          onTap: handleSendComment,
                          borderRadius: BorderRadius.circular(24),
                          child: Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: theme.colorScheme.primary,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.arrow_upward,
                              color: Colors.white,
                              size: 18,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      );
    },
  );
}

// Extracted helper method with context parameter
Widget _buildCommentBubble({
  required Comment comment,
  required bool isCurrentUser,
  required ThemeData theme,
  required VoidCallback onDelete,
  required BuildContext context,
}) {
  final bubbleColor = isCurrentUser
      ? theme.colorScheme.primary
      : theme.colorScheme.surface;
  final textColor = isCurrentUser
      ? Colors.white
      : theme.colorScheme.onSurface;
  final bubbleAlignment = isCurrentUser
      ? CrossAxisAlignment.end
      : CrossAxisAlignment.start;
  final avatarLetter = comment.displayName.isNotEmpty
      ? comment.displayName[0].toUpperCase()
      : '?';

  // Format time - assuming Comment class has a property for time
  // If not, this can be adapted to work with whatever is available
  String timeText = ''; // Default empty string if no time available

  return Padding(
    padding: const EdgeInsets.only(bottom: 12.0),
    child: Row(
      mainAxisAlignment: isCurrentUser
          ? MainAxisAlignment.end
          : MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (!isCurrentUser) ...[
          _buildAvatar(avatarLetter, theme),
          const SizedBox(width: 8),
        ],
        Flexible(
          child: Container(
            constraints: BoxConstraints(
              maxWidth: MediaQuery.of(context).size.width * 0.75,
            ),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: bubbleColor,
              borderRadius: BorderRadius.circular(18).copyWith(
                bottomLeft: isCurrentUser ? const Radius.circular(18) : const Radius.circular(2),
                bottomRight: isCurrentUser ? const Radius.circular(2) : const Radius.circular(18),
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  blurRadius: 3,
                  offset: const Offset(0, 1),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: bubbleAlignment,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      comment.displayName,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: textColor.withOpacity(0.8),
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      timeText, // Use empty string or available timestamp
                      style: TextStyle(
                        fontSize: 10,
                        color: textColor.withOpacity(0.6),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  comment.text,
                  style: TextStyle(
                    fontSize: 14,
                    color: textColor,
                  ),
                ),
              ],
            ),
          ),
        ),
        if (isCurrentUser) ...[
          const SizedBox(width: 8),
          _buildAvatar(avatarLetter, theme),
        ],
        // More options menu - using standard Material popup menu
        if (isCurrentUser)
          PopupMenuButton<String>(
            icon: Icon(
              Icons.more_vert,
              size: 16,
              color: theme.colorScheme.onSurface.withOpacity(0.5),
            ),
            padding: EdgeInsets.zero,
            itemBuilder: (context) => [
              PopupMenuItem<String>(
                value: 'delete',
                child: Row(
                  children: [
                    Icon(Icons.delete, color: theme.colorScheme.error, size: 16),
                    const SizedBox(width: 8),
                    Text('Delete', style: TextStyle(color: theme.colorScheme.error)),
                  ],
                ),
              ),
            ],
            onSelected: (value) {
              if (value == 'delete') {
                onDelete();
              }
            },
          ),
      ],
    ),
  );
}

Widget _buildAvatar(String letter, ThemeData theme) {
  return Container(
    width: 32,
    height: 32,
    decoration: BoxDecoration(
      color: theme.colorScheme.primary,
      shape: BoxShape.circle,
    ),
    alignment: Alignment.center,
    child: Text(
      letter,
      style: const TextStyle(
        color: Colors.white,
        fontWeight: FontWeight.bold,
        fontSize: 14,
      ),
    ),
  );
}
class Downloads extends StatelessWidget {
  final String? documentUrl;

  const Downloads({super.key, this.documentUrl});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (documentUrl != null && documentUrl!.isNotEmpty) {
      return FadeInUp(
        duration: const Duration(milliseconds: 1000),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: Container(
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: theme.primaryColorLight,
                    foregroundColor: theme.primaryColorDark,
                    // Icon and text color
                    padding: const EdgeInsets.symmetric(
                        vertical: 15, horizontal: 20),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  icon: Icon(
                    Icons.download,
                    color: theme.primaryColorDark, // White icon for contrast
                  ),
                  label: const Text("Download"),
                  onPressed: () async {
                    if (documentUrl == null || documentUrl!.isEmpty) {
                      print('Document URL is null or empty');
                      return;
                    }
                    print('Attempting to launch: $documentUrl');
                    if (await canLaunchUrl(Uri.parse(documentUrl!))) {
                      await launchUrl(Uri.parse(documentUrl!),
                          mode: LaunchMode.externalApplication);
                      print('Launch successful: $documentUrl');
                    } else {
                      print('Failed to launch: $documentUrl');
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text("Could not launch download link."),
                        ),
                      );
                    }
                  },
                ),
              ),
            ),
            const SizedBox(width: 10), // Spacing between buttons
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(20),
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: theme.primaryColorLight,
                    // Lighter background color
                    foregroundColor: theme.primaryColorDark,
                    // Darker text color to contrast the light background
                    padding: const EdgeInsets.symmetric(
                        vertical: 15, horizontal: 20),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  icon: Icon(
                    Icons.preview,
                    color: theme.primaryColorDark, // Darker icon for contrast
                  ),
                  label: const Text("Preview"),
                  onPressed: () async {
                    if (documentUrl != null && documentUrl!.isNotEmpty) {
                      if (await canLaunchUrl(Uri.parse(documentUrl!))) {
                        await launchUrl(Uri.parse(documentUrl!));
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text("Could not open the PDF preview."),
                          ),
                        );
                      }
                    }
                  },
                ),
              ),
            ),
          ],
        ),
      );
    } else {
      return FadeInUp(
        duration: const Duration(milliseconds: 900),
        child: Container(
          padding: const EdgeInsets.all(20),
          child: const Text("No documents available for download."),
        ),
      );
    }
  }
}

class PolicyCarousel extends StatelessWidget {
  final List<String> images;

  const PolicyCarousel({super.key, required this.images});

  @override
  Widget build(BuildContext context) {
    if (images.isEmpty) {
      return const Center(
        child: Text(
          "No images available",
          style: TextStyle(fontSize: 18, color: Colors.grey),
        ),
      );
    }

    return FadeIn(
      duration: const Duration(milliseconds: 800),
      child: Container(
        width: double.infinity,
        height: 250,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: NetworkImage(images.first),
            fit: BoxFit.cover,
          ),
        ),
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.bottomRight,
              colors: [
                Colors.black.withOpacity(0.6),
                Colors.transparent,
              ],
            ),
          ),
        ),
      ),
    );
  }
}
