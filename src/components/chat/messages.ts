/**
 * Chat GPT
 */
const conversation = [
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:46:39+00:00",
    message: "Hello, Bob! How are you?",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T08:47:21+00:00",
    message: "Hey, Alice! I'm doing well, thanks for asking. How about you?",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:47:59+00:00",
    message: "I'm good too! Just working on a project. Need any help?",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T08:48:32+00:00",
    message: "Actually, yes. I'm stuck on this bug. Can you take a look?",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:49:07+00:00",
    message: "Sure! Share the code with me, and I'll see what I can do.",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T08:50:14+00:00",
    message: "Thanks, Alice! Here's the snippet...",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:51:03+00:00",
    message: "I found the issue. It's a simple typo. Let me fix it for you.",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T08:51:55+00:00",
    message: "You're a lifesaver, Alice! That fixed it. Thanks a ton!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:52:39+00:00",
    message:
      "No problem, Bob! Glad I could help. Anything else you need assistance with?",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T08:53:12+00:00",
    message:
      "Not at the moment, but I'll keep you posted if I need anything else. Thanks again!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:54:06+00:00",
    message: "You're welcome, Bob! Have a great day!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T08:54:41+00:00",
    message: "You too, Alice! Take care!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:55:15+00:00",
    message: "Thanks, Bob! Goodbye!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T08:55:53+00:00",
    message: "Goodbye, Alice!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:56:32+00:00",
    message: "Hey, Bob! How's your day going?",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T08:57:11+00:00",
    message:
      "Hi, Alice! It's been a busy day, but I'm managing. How about you?",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:57:49+00:00",
    message:
      "I'm doing well too. Just finished a meeting. Any exciting plans for the weekend?",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T08:58:32+00:00",
    message:
      "Not really, just planning to relax and catch up on some reading. How about you?",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T08:59:14+00:00",
    message:
      "That sounds nice! I'm thinking of going hiking with friends. It's been a while since I spent time in nature.",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:00:02+00:00",
    message:
      "Hiking sounds amazing! I hope you have a great time and enjoy the beautiful scenery.",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:00:51+00:00",
    message:
      "Thank you, Bob! I'm really looking forward to it. Let's catch up next week and share our weekend experiences!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:01:35+00:00",
    message:
      "Absolutely! I can't wait to hear about your hiking adventure. Have a fantastic weekend, Alice!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:02:19+00:00",
    message:
      "Thank you, Bob! Enjoy your relaxing weekend too. Talk to you soon!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:03:01+00:00",
    message:
      "Will do, Alice! Take care and have a great time hiking. See you next week!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:03:42+00:00",
    message: "Goodbye, Bob! See you soon!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:04:15+00:00",
    message: "Goodbye, Alice! Take care!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:04:58+00:00",
    message:
      "Hey, Bob! How was your weekend? Mine was incredible! The views during the hike were breathtaking.",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:05:42+00:00",
    message:
      "Hi, Alice! My weekend was relaxing. That's fantastic to hear! I'm glad you had a memorable hiking experience. Tell me more!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:06:23+00:00",
    message:
      "The trail led us through lush forests, alongside gushing waterfalls, and up to a stunning mountain peak. We even had a picnic with a panoramic view. It was truly rejuvenating!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:07:10+00:00",
    message:
      "Wow, Alice! That sounds like an unforgettable experience. Nature has a way of refreshing our spirits. I'm glad you had such a wonderful time!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:07:52+00:00",
    message:
      "Absolutely, Bob! It was a much-needed escape from the city. How about you? Did you have a chance to dive into your reading list?",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:08:37+00:00",
    message:
      "Indeed, Alice! I managed to finish a captivating novel and started another one. Books have a way of transporting us to different worlds. It was a fulfilling weekend!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:09:20+00:00",
    message:
      "That's wonderful, Bob! Getting lost in a good book is a joyous experience. Any recommendations from your recent reads?",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:10:05+00:00",
    message:
      "Absolutely, Alice! I highly recommend 'The Midnight Library' by Matt Haig. It's a thought-provoking and heartwarming tale about second chances and the infinite possibilities of life. I couldn't put it down!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:10:51+00:00",
    message:
      "That sounds intriguing, Bob! I'll definitely add it to my reading list. Thanks for the recommendation!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:11:32+00:00",
    message:
      "You're welcome, Alice! I'm sure you'll enjoy it. Let me know your thoughts once you've read it. By the way, do you have any book recommendations for me?",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:12:15+00:00",
    message:
      "Certainly, Bob! If you haven't read it yet, I highly recommend 'The Alchemist' by Paulo Coelho. It's a beautiful allegorical novel that explores the meaning of life, personal dreams, and the importance of following one's heart. It's a timeless classic!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:12:59+00:00",
    message:
      "Thank you, Alice! 'The Alchemist' has been on my radar for a while now. I'll make sure to read it soon. I appreciate the recommendation!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:13:41+00:00",
    message:
      "You're welcome, Bob! I'm glad I could suggest a book that piques your interest. I'm sure you'll find it inspiring. Enjoy your reading journey!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:14:22+00:00",
    message:
      "Thank you, Alice! I appreciate your kind words. I'm looking forward to diving into 'The Alchemist.' Have a fantastic week ahead!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:15:03+00:00",
    message:
      "You too, Bob! Wishing you a productive and fulfilling week. Let's catch up again soon!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:15:48+00:00",
    message:
      "Absolutely, Alice! Take care and have a wonderful week ahead. We'll definitely catch up soon. Goodbye for now!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:16:28+00:00",
    message:
      "Goodbye, Bob! Thank you once again for the lovely conversation. Stay safe and talk to you soon!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:17:05+00:00",
    message:
      "You're most welcome, Alice! I thoroughly enjoyed our conversation too. Take care and have a fantastic day!",
  },
  {
    username: "Alice",
    avatar: "http://localhost:3000/public/images/avatars/alice_avatar",
    timestamp: "2023-06-14T09:17:47+00:00",
    message: "Thank you, Bob! Have a wonderful day as well. Goodbye!",
  },
  {
    username: "Bob",
    avatar: "http://localhost:3000/public/images/avatars/bob_avatar",
    timestamp: "2023-06-14T09:18:30+00:00",
    message: "Goodbye, Alice! Take care and talk to you soon. Bye!",
  },
];
export default conversation;
