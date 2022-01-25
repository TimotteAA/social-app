/*
 Navicat Premium Data Transfer

 Source Server         : timotte
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : chat-app

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 10/01/2022 11:08:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES (1, '1641621755162.png', 'image/png', 11417814, 1, '2022-01-08 14:02:35', '2022-01-08 14:02:35');
INSERT INTO `avatar` VALUES (2, '1641621817054.png', 'image/png', 11417814, 1, '2022-01-08 14:03:37', '2022-01-08 14:03:37');
INSERT INTO `avatar` VALUES (3, '1641621840282.png', 'image/png', 11417814, 1, '2022-01-08 14:04:00', '2022-01-08 14:04:00');
INSERT INTO `avatar` VALUES (4, '1641622358651.jpg', 'image/jpeg', 1688463, 8, '2022-01-08 14:12:38', '2022-01-08 14:12:38');
INSERT INTO `avatar` VALUES (5, '1641622379213.jpg', 'image/jpeg', 835264, 8, '2022-01-08 14:12:59', '2022-01-08 14:12:59');
INSERT INTO `avatar` VALUES (6, '1641627983195.jpg', 'image/jpeg', 549982, 8, '2022-01-08 15:46:23', '2022-01-08 15:46:23');
INSERT INTO `avatar` VALUES (7, '1641628646309.jpg', 'image/jpeg', 553748, 8, '2022-01-08 15:57:26', '2022-01-08 15:57:26');
INSERT INTO `avatar` VALUES (8, '1641628659546.jpg', 'image/jpeg', 1182069, 8, '2022-01-08 15:57:39', '2022-01-08 15:57:39');
INSERT INTO `avatar` VALUES (9, '1641701235514.jpg', 'image/jpeg', 549982, 8, '2022-01-09 12:07:15', '2022-01-09 12:07:15');
INSERT INTO `avatar` VALUES (10, '1641774950515.jpeg', 'image/jpeg', 144661, 11, '2022-01-10 08:35:50', '2022-01-10 08:35:50');

-- ----------------------------
-- Table structure for conversation
-- ----------------------------
DROP TABLE IF EXISTS `conversation`;
CREATE TABLE `conversation`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `receiver_id` int NULL DEFAULT NULL,
  `sender_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `receiver_id`(`receiver_id`) USING BTREE,
  INDEX `sender_id`(`sender_id`) USING BTREE,
  CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conversation
-- ----------------------------
INSERT INTO `conversation` VALUES (2, 7, 8, '2022-01-07 17:22:10', '2022-01-07 17:22:10');
INSERT INTO `conversation` VALUES (3, 10, 8, '2022-01-07 17:23:42', '2022-01-07 17:23:42');
INSERT INTO `conversation` VALUES (14, 11, 8, '2022-01-10 09:28:14', '2022-01-10 09:28:14');

-- ----------------------------
-- Table structure for cover
-- ----------------------------
DROP TABLE IF EXISTS `cover`;
CREATE TABLE `cover`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `cover_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cover
-- ----------------------------
INSERT INTO `cover` VALUES (1, '1641627815064.jpg', 'image/jpeg', 1688463, 1, '2022-01-08 15:43:35', '2022-01-08 15:43:35');
INSERT INTO `cover` VALUES (2, '1641628149452.jpg', 'image/jpeg', 1688463, 1, '2022-01-08 15:49:09', '2022-01-08 15:49:09');
INSERT INTO `cover` VALUES (3, '1641628160805.jpg', 'image/jpeg', 993556, 8, '2022-01-08 15:49:20', '2022-01-08 15:49:20');
INSERT INTO `cover` VALUES (4, '1641628443552.png', 'image/png', 11417814, 8, '2022-01-08 15:54:03', '2022-01-08 15:54:03');
INSERT INTO `cover` VALUES (5, '1641628674056.jpg', 'image/jpeg', 1688463, 8, '2022-01-08 15:57:54', '2022-01-08 15:57:54');
INSERT INTO `cover` VALUES (6, '1641628735237.jpg', 'image/jpeg', 559896, 8, '2022-01-08 15:58:55', '2022-01-08 15:58:55');
INSERT INTO `cover` VALUES (7, '1641628744690.jpg', 'image/jpeg', 644077, 8, '2022-01-08 15:59:04', '2022-01-08 15:59:04');
INSERT INTO `cover` VALUES (8, '1641628750874.jpg', 'image/jpeg', 1688463, 8, '2022-01-08 15:59:10', '2022-01-08 15:59:10');
INSERT INTO `cover` VALUES (9, '1641628892696.jpg', 'image/jpeg', 1095436, 7, '2022-01-08 16:01:32', '2022-01-08 16:01:32');
INSERT INTO `cover` VALUES (10, '1641700373104.jpg', 'image/jpeg', 1095436, 8, '2022-01-09 11:52:53', '2022-01-09 11:52:53');
INSERT INTO `cover` VALUES (11, '1641774950532.jpeg', 'image/jpeg', 41427, 11, '2022-01-10 08:35:50', '2022-01-10 08:35:50');

-- ----------------------------
-- Table structure for followers
-- ----------------------------
DROP TABLE IF EXISTS `followers`;
CREATE TABLE `followers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `follower_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `follower_id`(`follower_id`) USING BTREE,
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 68 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of followers
-- ----------------------------
INSERT INTO `followers` VALUES (3, 3, 6, '2021-12-29 17:45:11', '2021-12-29 17:45:11');
INSERT INTO `followers` VALUES (5, 3, 1, '2022-01-01 16:15:23', '2022-01-01 16:15:23');
INSERT INTO `followers` VALUES (62, 10, 8, '2022-01-08 09:41:57', '2022-01-08 09:41:57');
INSERT INTO `followers` VALUES (63, 8, 10, '2022-01-08 09:44:13', '2022-01-08 09:44:13');
INSERT INTO `followers` VALUES (64, 8, 7, '2022-01-08 15:59:50', '2022-01-08 15:59:50');
INSERT INTO `followers` VALUES (68, 11, 8, '2022-01-10 08:38:59', '2022-01-10 08:38:59');
INSERT INTO `followers` VALUES (69, 8, 11, '2022-01-10 08:40:31', '2022-01-10 08:40:31');
INSERT INTO `followers` VALUES (70, 7, 8, '2022-01-10 10:57:29', '2022-01-10 10:57:29');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` int NULL DEFAULT NULL,
  `sender_id` int NULL DEFAULT NULL,
  `text` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `coversation_id`(`conversation_id`) USING BTREE,
  INDEX `sender_id`(`sender_id`) USING BTREE,
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (1, 2, 8, 'Hello!', '2022-01-07 17:45:57', '2022-01-07 17:45:57');
INSERT INTO `message` VALUES (2, 2, 7, 'Hello! it\'s john', '2022-01-07 17:46:36', '2022-01-07 17:46:36');
INSERT INTO `message` VALUES (5, 3, 10, 'test', '2022-01-07 18:18:56', '2022-01-07 18:18:56');
INSERT INTO `message` VALUES (6, 3, 8, 'test, it\'s jane', '2022-01-07 18:43:25', '2022-01-07 18:43:25');
INSERT INTO `message` VALUES (30, 2, 8, 'Hello React', '2022-01-07 19:15:50', '2022-01-07 19:15:50');
INSERT INTO `message` VALUES (32, 2, 8, 'Hello React', '2022-01-07 19:18:12', '2022-01-07 19:18:12');
INSERT INTO `message` VALUES (34, 2, 8, 'tse', '2022-01-07 19:22:38', '2022-01-07 19:22:38');
INSERT INTO `message` VALUES (35, 2, 8, '1', '2022-01-07 19:23:47', '2022-01-07 19:23:47');
INSERT INTO `message` VALUES (36, 2, 8, '12132', '2022-01-07 19:23:51', '2022-01-07 19:23:51');
INSERT INTO `message` VALUES (37, 2, 8, '1213212312', '2022-01-07 19:23:53', '2022-01-07 19:23:53');
INSERT INTO `message` VALUES (38, 2, 7, 'its from john', '2022-01-07 19:26:33', '2022-01-07 19:26:33');
INSERT INTO `message` VALUES (39, 2, 8, '123124', '2022-01-08 09:00:10', '2022-01-08 09:00:10');
INSERT INTO `message` VALUES (40, 2, 8, 'test\n', '2022-01-08 09:01:33', '2022-01-08 09:01:33');
INSERT INTO `message` VALUES (41, 2, 8, 'test', '2022-01-08 09:03:43', '2022-01-08 09:03:43');
INSERT INTO `message` VALUES (42, 2, 8, '123', '2022-01-08 09:04:14', '2022-01-08 09:04:14');
INSERT INTO `message` VALUES (43, 2, 7, '123', '2022-01-08 09:08:15', '2022-01-08 09:08:15');
INSERT INTO `message` VALUES (44, 2, 8, '测试\n', '2022-01-08 09:08:58', '2022-01-08 09:08:58');
INSERT INTO `message` VALUES (45, 2, 7, '测试', '2022-01-08 09:09:03', '2022-01-08 09:09:03');
INSERT INTO `message` VALUES (46, 2, 7, 'asdas', '2022-01-08 09:09:32', '2022-01-08 09:09:32');
INSERT INTO `message` VALUES (47, 2, 7, '123', '2022-01-08 09:34:07', '2022-01-08 09:34:07');
INSERT INTO `message` VALUES (48, 3, 10, '1', '2022-01-08 09:42:32', '2022-01-08 09:42:32');
INSERT INTO `message` VALUES (49, 2, 7, 'last test', '2022-01-08 11:47:26', '2022-01-08 11:47:26');
INSERT INTO `message` VALUES (50, 2, 8, 'thank you', '2022-01-08 11:47:38', '2022-01-08 11:47:38');
INSERT INTO `message` VALUES (51, 2, 8, 'Hello\n', '2022-01-08 13:28:56', '2022-01-08 13:28:56');
INSERT INTO `message` VALUES (52, 2, 8, 'hello again', '2022-01-08 13:29:04', '2022-01-08 13:29:04');
INSERT INTO `message` VALUES (53, 2, 7, '你好呀', '2022-01-09 11:53:53', '2022-01-09 11:53:53');
INSERT INTO `message` VALUES (54, 2, 8, '我好吗，我不知道', '2022-01-09 11:54:01', '2022-01-09 11:54:01');
INSERT INTO `message` VALUES (55, 2, 8, '你吃饭了吗\n', '2022-01-09 12:08:49', '2022-01-09 12:08:49');
INSERT INTO `message` VALUES (56, 2, 7, '吃了吧，应该', '2022-01-09 12:08:56', '2022-01-09 12:08:56');
INSERT INTO `message` VALUES (57, 2, 8, '123124', '2022-01-09 15:42:17', '2022-01-09 15:42:17');
INSERT INTO `message` VALUES (58, 14, 8, 'hello', '2022-01-10 10:08:10', '2022-01-10 10:08:10');
INSERT INTO `message` VALUES (59, 2, 8, 'Hello', '2022-01-10 10:58:34', '2022-01-10 10:58:34');
INSERT INTO `message` VALUES (60, 2, 7, 'e', '2022-01-10 10:58:54', '2022-01-10 10:58:54');
INSERT INTO `message` VALUES (61, 2, 7, '134', '2022-01-10 10:58:58', '2022-01-10 10:58:58');
INSERT INTO `message` VALUES (62, 2, 7, '123', '2022-01-10 11:00:10', '2022-01-10 11:00:10');
INSERT INTO `message` VALUES (63, 2, 8, 'hello ', '2022-01-10 11:00:19', '2022-01-10 11:00:19');
INSERT INTO `message` VALUES (64, 2, 7, 'test', '2022-01-10 11:01:04', '2022-01-10 11:01:04');
INSERT INTO `message` VALUES (65, 2, 8, 'test', '2022-01-10 11:01:07', '2022-01-10 11:01:07');
INSERT INTO `message` VALUES (66, 2, 8, 'trest', '2022-01-10 11:01:10', '2022-01-10 11:01:10');
INSERT INTO `message` VALUES (67, 2, 7, '12345', '2022-01-10 11:01:29', '2022-01-10 11:01:29');
INSERT INTO `message` VALUES (68, 2, 8, '131245', '2022-01-10 11:01:32', '2022-01-10 11:01:32');
INSERT INTO `message` VALUES (69, 2, 8, '1251', '2022-01-10 11:01:57', '2022-01-10 11:01:57');
INSERT INTO `message` VALUES (70, 2, 7, '2151', '2022-01-10 11:01:59', '2022-01-10 11:01:59');
INSERT INTO `message` VALUES (71, 2, 8, 'test', '2022-01-10 11:02:03', '2022-01-10 11:02:03');
INSERT INTO `message` VALUES (72, 2, 8, 'eee', '2022-01-10 11:02:11', '2022-01-10 11:02:11');
INSERT INTO `message` VALUES (73, 2, 8, 'ee', '2022-01-10 11:02:13', '2022-01-10 11:02:13');
INSERT INTO `message` VALUES (74, 2, 7, 'eee', '2022-01-10 11:02:14', '2022-01-10 11:02:14');
INSERT INTO `message` VALUES (75, 2, 7, 'eee', '2022-01-10 11:02:16', '2022-01-10 11:02:16');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `img_url` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (1, 6, '初爸爸赛高~', NULL, '2022-01-01 13:55:54', '2022-01-01 14:04:30');
INSERT INTO `moment` VALUES (3, 1, 'PHP是世界上最好的语言', NULL, '2022-01-01 14:02:08', '2022-01-01 14:02:08');
INSERT INTO `moment` VALUES (4, 1, '初爸爸赛高~', NULL, '2022-01-01 14:02:08', '2022-01-01 14:03:30');
INSERT INTO `moment` VALUES (5, 1, 'PHP是世界上最好的语言', NULL, '2022-01-01 16:16:09', '2022-01-01 16:16:09');
INSERT INTO `moment` VALUES (6, 1, 'asdazcas', NULL, '2022-01-01 16:16:17', '2022-01-01 16:16:17');
INSERT INTO `moment` VALUES (7, 3, '初爸爸赛高~', NULL, '2022-01-01 16:16:53', '2022-01-01 16:17:37');
INSERT INTO `moment` VALUES (8, 3, 'asdazcas', NULL, '2022-01-01 16:16:54', '2022-01-01 16:16:54');
INSERT INTO `moment` VALUES (9, 3, 'asdazcas', NULL, '2022-01-01 16:16:55', '2022-01-01 16:16:55');
INSERT INTO `moment` VALUES (10, 8, 'This is my first moment', 'post/1.jpeg', '2022-01-05 12:47:33', '2022-01-05 13:40:43');
INSERT INTO `moment` VALUES (11, 8, 'Hey Friends', 'post/2.jpeg', '2022-01-05 12:47:41', '2022-01-05 12:49:14');
INSERT INTO `moment` VALUES (12, 7, 'Hey Friends, this is john', 'post/3.jpeg', '2022-01-05 12:47:56', '2022-01-05 12:49:31');
INSERT INTO `moment` VALUES (59, 8, 'sexy lady', 'post/1641628763477.jpg', '2022-01-08 15:59:23', '2022-01-08 15:59:23');
INSERT INTO `moment` VALUES (60, 7, 'beautify lady', 'post/1641628820384.jpg', '2022-01-08 16:00:20', '2022-01-08 16:00:20');
INSERT INTO `moment` VALUES (61, 7, 'test again', NULL, '2022-01-09 11:51:48', '2022-01-09 11:51:48');
INSERT INTO `moment` VALUES (62, 7, '测试', NULL, '2022-01-09 11:53:26', '2022-01-09 11:53:26');
INSERT INTO `moment` VALUES (63, 8, '  测试', 'post/1641701271429.jpg', '2022-01-09 12:07:51', '2022-01-09 12:07:51');
INSERT INTO `moment` VALUES (64, 7, 'test ', NULL, '2022-01-09 15:42:01', '2022-01-09 15:42:01');
INSERT INTO `moment` VALUES (65, 11, '这是我的第一条动态', 'post/1641774893184.jpeg', '2022-01-10 08:34:53', '2022-01-10 08:34:53');

-- ----------------------------
-- Table structure for moment_likes
-- ----------------------------
DROP TABLE IF EXISTS `moment_likes`;
CREATE TABLE `moment_likes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `moment_id` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  CONSTRAINT `moment_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_likes_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 96 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment_likes
-- ----------------------------
INSERT INTO `moment_likes` VALUES (1, 1, 6, '2022-01-01 14:25:45', '2022-01-01 14:25:45');
INSERT INTO `moment_likes` VALUES (11, 3, 1, '2022-01-01 16:01:21', '2022-01-01 16:01:21');
INSERT INTO `moment_likes` VALUES (12, 1, 1, '2022-01-01 16:01:35', '2022-01-01 16:01:35');
INSERT INTO `moment_likes` VALUES (15, 1, 7, '2022-01-06 09:25:26', '2022-01-06 09:25:26');
INSERT INTO `moment_likes` VALUES (76, 10, 8, '2022-01-06 11:18:03', '2022-01-06 11:18:03');
INSERT INTO `moment_likes` VALUES (87, 12, 8, '2022-01-07 17:54:53', '2022-01-07 17:54:53');
INSERT INTO `moment_likes` VALUES (91, 61, 8, '2022-01-09 11:52:11', '2022-01-09 11:52:11');
INSERT INTO `moment_likes` VALUES (92, 61, 7, '2022-01-09 11:52:16', '2022-01-09 11:52:16');
INSERT INTO `moment_likes` VALUES (93, 62, 8, '2022-01-09 12:06:55', '2022-01-09 12:06:55');
INSERT INTO `moment_likes` VALUES (94, 63, 8, '2022-01-09 12:07:53', '2022-01-09 12:07:53');
INSERT INTO `moment_likes` VALUES (96, 65, 8, '2022-01-10 10:09:15', '2022-01-10 10:09:15');
INSERT INTO `moment_likes` VALUES (97, 64, 8, '2022-01-10 10:09:16', '2022-01-10 10:09:16');
INSERT INTO `moment_likes` VALUES (98, 65, 11, '2022-01-10 10:09:22', '2022-01-10 10:09:22');
INSERT INTO `moment_likes` VALUES (99, 63, 7, '2022-01-10 10:58:06', '2022-01-10 10:58:06');

-- ----------------------------
-- Table structure for picture
-- ----------------------------
DROP TABLE IF EXISTS `picture`;
CREATE TABLE `picture`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `moment_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `picture_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `picture_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of picture
-- ----------------------------
INSERT INTO `picture` VALUES (1, '1641441040088.png', 'image/png', 1363089, 8, 10, '2022-01-06 11:50:40', '2022-01-06 11:50:40');
INSERT INTO `picture` VALUES (2, '1641441282617.png', 'image/png', 1363089, 8, 10, '2022-01-06 11:54:42', '2022-01-06 11:54:42');
INSERT INTO `picture` VALUES (3, '1641442095501.png', 'image/png', 1363089, 8, 10, '2022-01-06 12:08:15', '2022-01-06 12:08:15');
INSERT INTO `picture` VALUES (16, '1641628763477.jpg', 'image/jpeg', 559896, 8, 59, '2022-01-08 15:59:23', '2022-01-08 15:59:23');
INSERT INTO `picture` VALUES (17, '1641628820384.jpg', 'image/jpeg', 800029, 7, 60, '2022-01-08 16:00:20', '2022-01-08 16:00:20');
INSERT INTO `picture` VALUES (18, '1641701271429.jpg', 'image/jpeg', 835264, 8, 63, '2022-01-09 12:07:51', '2022-01-09 12:07:51');
INSERT INTO `picture` VALUES (19, '1641774893184.jpeg', 'image/jpeg', 41427, 11, 65, '2022-01-10 08:34:53', '2022-01-10 08:34:53');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isAdmin` int NULL DEFAULT 0,
  `description` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `hometown` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `relationship` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `profilePicture` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `coverPicture` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '124124r1', 'test1@gmail.com', '8ad82caca02c6baa8f0a7ad4c08ad795', 0, '这是我的新评论', '上海市', '北京', 1, '2021-12-29 06:15:01', '2022-01-08 15:49:09', 'person/1641621840282.png', 'cover/1641628149452.jpg');
INSERT INTO `users` VALUES (2, 'test2', 'test2@gmail.com', '8ad82caca02c6baa8f0a7ad4c08ad795', 0, NULL, NULL, NULL, NULL, '2021-12-29 06:15:08', '2021-12-29 06:15:08', NULL, NULL);
INSERT INTO `users` VALUES (3, 'test3', 'test3@gmail.com', '8ad82caca02c6baa8f0a7ad4c08ad795', 0, NULL, NULL, NULL, NULL, '2021-12-29 06:15:13', '2021-12-29 06:15:13', NULL, NULL);
INSERT INTO `users` VALUES (6, 'timotte', 'timotte@gmail.com', '8ad82caca02c6baa8f0a7ad4c08ad795', 0, '你好，我的老夥計', 'New York', 'Madrid', 1, '2021-12-29 17:07:57', '2022-01-05 12:42:51', NULL, NULL);
INSERT INTO `users` VALUES (7, 'john', 'john@gmail.com', '25d55ad283aa400af464c76d713c07ad', 0, '我是John，欢迎来到我的主页！', '天皇上国', '中国', 3, '2022-01-05 12:42:03', '2022-01-08 16:01:32', 'person/1641441282617.png', 'cover/1641628892696.jpg');
INSERT INTO `users` VALUES (8, 'jane', 'jane@gmail.com', '25d55ad283aa400af464c76d713c07ad', 0, '欢迎来到Jane的主页', '上海', '不知道', 1, '2022-01-05 12:43:26', '2022-01-09 12:07:15', 'person/1641701235514.jpg', 'cover/1641700373104.jpg');
INSERT INTO `users` VALUES (10, 'timottetest', 'timottetest@gmail.com', '8ad82caca02c6baa8f0a7ad4c08ad795', 0, NULL, NULL, NULL, NULL, '2022-01-05 18:34:10', '2022-01-05 18:34:10', NULL, NULL);
INSERT INTO `users` VALUES (11, 'fucker', 'fucker@gmail.com', '25d55ad283aa400af464c76d713c07ad', 0, '我是fucker，欢迎来到我的主页', '上海', '天堂', 0, '2022-01-10 08:34:15', '2022-01-10 08:36:00', 'person/1641774950515.jpeg', 'cover/1641774950532.jpeg');

SET FOREIGN_KEY_CHECKS = 1;
