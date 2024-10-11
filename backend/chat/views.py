from django.http import JsonResponse
import openai
import dotenv
import re
import os

# Create your views here.
dotenv.load_dotenv()
openai_key = os.getenv('CHATGPT_KEY')


def chatbot_response(request):
    user_input = request.GET.get('input')
    system_content = """
        Make your response in a style where you are an AI assistant.
        Only accept prompts about dengue topic. If topic isnt about dengue, return a message saying that you only accept prompts about dengue. 
        Make it informative.
        """
    client = openai.Client(api_key=openai_key)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_input},
        ]
    )
    response_text = response.choices[0].message.content
    if response_text[-2:] == "\n":
        response_text = response_text[:-1]
    response_html = re.sub(r'<br>', '\n', response_text)
    print(response_html)
    json_response = {
        'response': response_html
    }
    return JsonResponse(response_html, safe = False)
