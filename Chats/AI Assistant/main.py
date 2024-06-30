from hugchat import hugchat
from hugchat.login import Login

EMAIL = "dyuti.dasmahapatra.21cse@bmu.edu.in"
PASSWD = "Saturn*12"
cookie_path_dir = "./cookies"
sign = Login(EMAIL, PASSWD)
cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)
chatbot = hugchat.ChatBot(cookies=cookies.get_dict())


# EMAIL = "dyuti.dasmahapatra.21cse@bmu.edu.in"
# PASSWD = "Saturn*12"
# cookie_path_dir = "./cookies"
# sign = Login(EMAIL, PASSWD)
# cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)
# chatbot = hugchat.ChatBot(cookies=cookies.get_dict())

# def chat(message):
#     user_input = message
#     if user_input:
#         response = chatbot.chat(user_input)
#         print(response)
#         return str(response)
#     else:
#         return "No input provided."

# # Example usage:
# user_message = "You're a mental health therapist. Your goal is to create a supportive and comforting environment for individuals seeking guidance. Respond empathetically to user messages, offering advice and insights related to mental health to help them feel at ease and understood. Below is the patient's message: Hello there"
# response = chat(user_message)
# print(response)
