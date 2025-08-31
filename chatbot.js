// Chatbot functionality for MVGraphix
document.addEventListener('DOMContentLoaded', function () {
    // Chatbot data - questions and responses
    const chatbotData = {
        'greeting': {
            question: 'Welcome to MVGraphix! How may we help you?',
            responses: [
                'What services do you offer?',
                'How much do your services cost?',
                'How can I contact you?',
                'Do you have a portfolio?'
            ]
        },
        'services': {
            question: 'What services are you interested in?',
            responses: [
                'Graphic Design',
                'Software Development',
                '3D House Plans',
                'All Services'
            ]
        },
        'graphic_design': {
            question: 'Great! We offer comprehensive graphic design services including:',
            response: '• Logo & Branding\n• Marketing Materials\n• Social Media Graphics\n• Print Design\n\nWould you like to know more about pricing or see examples?',
            followup: ['Pricing', 'Portfolio Examples', 'Back to Services']
        },
        'software_development': {
            question: 'Excellent! Our software development services include:',
            response: '• Web Applications\n• Mobile Apps\n• API Development\n• System Integration\n\nWould you like to discuss your project requirements?',
            followup: ['Project Discussion', 'Pricing', 'Back to Services']
        },
        '3d_plans': {
            question: 'Perfect! Our 3D house plan services include:',
            response: '• Architectural Design\n• 3D Visualization\n• Interior Planning\n• Virtual Tours\n\nWould you like to see our portfolio or get a quote?',
            followup: ['Portfolio', 'Get Quote', 'Back to Services']
        },
        'pricing': {
            question: 'Our pricing varies based on project requirements:',
            response: '• Graphic Design: Starting from k150\n• Software Development: Starting from k500\n• 3D House Plans: Starting from k1000\n\nWe offer free consultations and custom quotes. Would you like to schedule a call?',
            followup: ['Schedule Consultation', 'Back to Services']
        },
        'contact': {
            question: 'You can contact us through:',
            response: '📞 Phone: +260 97 880 7364\n📧 Email: mulilopaul16@gmail.com\n📍 Location: Lusaka, Zambia\n\nWe\'re available Monday-Friday: 8AM-6PM, Saturday: 10AM-4PM',
            followup: ['Send Message', 'Back to Main Menu']
        },
        'portfolio': {
            question: 'Check out our portfolio section below!',
            response: 'You can view our recent projects in the portfolio section of this website. We have examples of graphic design, software development, and 3D house plans.',
            followup: ['View Portfolio', 'Back to Services']
        }
    };

    // Create chatbot elements
    function createChatbot() {
        // Chatbot container
        const chatbotContainer = document.createElement('div');
        chatbotContainer.className = 'chatbot-container';
        chatbotContainer.innerHTML = `
            <div class="chatbot-header">
                <h4>MVGraphix Assistant</h4>
                <button class="chatbot-close">✖</button>
            </div>
            <div class="chatbot-messages"></div>
            <div class="chatbot-input">
                <div class="quick-replies"></div>
                <div class="text-input-container">
                    <input type="text" class="text-input" placeholder="Type your message here..." maxlength="200">
                    <button class="send-btn">Send</button>
                </div>
            </div>
        `;

        // Chatbot toggle button
        const chatbotToggle = document.createElement('button');
        chatbotToggle.className = 'chatbot-toggle';
        chatbotToggle.innerHTML = '<img src="images/Chatbot.jpg" alt="Chatbot" style="height: 50px; width: 50px;">';
        chatbotToggle.setAttribute('aria-label', 'Open Chat');

        // Add to body
        document.body.appendChild(chatbotToggle);
        document.body.appendChild(chatbotContainer);

        // Initialize chatbot
        initializeChatbot(chatbotContainer, chatbotToggle);
    }

    function initializeChatbot(container, toggle) {
        const messagesContainer = container.querySelector('.chatbot-messages');
        const quickRepliesContainer = container.querySelector('.quick-replies');
        const closeBtn = container.querySelector('.chatbot-close');
        const textInput = container.querySelector('.text-input');
        const sendBtn = container.querySelector('.send-btn');

        let currentState = 'greeting';

        // Toggle chatbot visibility
        toggle.addEventListener('click', () => {
            container.classList.toggle('active');
            if (container.classList.contains('active')) {
                startConversation();
            }
        });

        // Close chatbot
        closeBtn.addEventListener('click', () => {
            container.classList.remove('active');
        });

        // Text input event listeners
        sendBtn.addEventListener('click', () => {
            const message = textInput.value.trim();
            if (message) {
                handleUserMessage(message);
                textInput.value = '';
            }
        });

        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = textInput.value.trim();
                if (message) {
                    handleUserMessage(message);
                    textInput.value = '';
                }
            }
        });

        function startConversation() {
            messagesContainer.innerHTML = '';
            quickRepliesContainer.innerHTML = '';
            showMessage(chatbotData.greeting.question, 'bot');
            showQuickReplies(chatbotData.greeting.responses);
        }

        function showMessage(message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}-message`;
            messageDiv.textContent = message;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function showQuickReplies(replies) {
            quickRepliesContainer.innerHTML = '';
            replies.forEach(reply => {
                const button = document.createElement('button');
                button.className = 'quick-reply-btn';
                button.textContent = reply;
                button.addEventListener('click', () => handleQuickReply(reply));
                quickRepliesContainer.appendChild(button);
            });
        }

        function handleUserMessage(message) {
            showMessage(message, 'user');

            const lowerMessage = message.toLowerCase();

            // Check for keywords and respond accordingly
            if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer')) {
                currentState = 'services';
                showMessage(chatbotData.services.question, 'bot');
                showQuickReplies(chatbotData.services.responses);
            }
            else if (lowerMessage.includes('graphic') || lowerMessage.includes('design') || lowerMessage.includes('logo') || lowerMessage.includes('branding')) {
                currentState = 'graphic_design';
                showMessage(chatbotData.graphic_design.question, 'bot');
                showMessage(chatbotData.graphic_design.response, 'bot');
                showQuickReplies(chatbotData.graphic_design.followup);
            }
            else if (lowerMessage.includes('software') || lowerMessage.includes('development') || lowerMessage.includes('web') || lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
                currentState = 'software_development';
                showMessage(chatbotData.software_development.question, 'bot');
                showMessage(chatbotData.software_development.response, 'bot');
                showQuickReplies(chatbotData.software_development.followup);
            }
            else if (lowerMessage.includes('3d') || lowerMessage.includes('house') || lowerMessage.includes('plan') || lowerMessage.includes('architectural')) {
                currentState = '3d_plans';
                showMessage(chatbotData['3d_plans'].question, 'bot');
                showMessage(chatbotData['3d_plans'].response, 'bot');
                showQuickReplies(chatbotData['3d_plans'].followup);
            }
            else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('charge') || lowerMessage.includes('how much')) {
                currentState = 'pricing';
                showMessage(chatbotData.pricing.question, 'bot');
                showMessage(chatbotData.pricing.response, 'bot');
                showQuickReplies(chatbotData.pricing.followup);
            }
            else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('call')) {
                currentState = 'contact';
                showMessage(chatbotData.contact.question, 'bot');
                showMessage(chatbotData.contact.response, 'bot');
                showQuickReplies(chatbotData.contact.followup);
            }
            else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('example') || lowerMessage.includes('project')) {
                currentState = 'portfolio';
                showMessage(chatbotData.portfolio.question, 'bot');
                showMessage(chatbotData.portfolio.response, 'bot');
                showQuickReplies(chatbotData.portfolio.followup);
            }
            else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('greetings')) {
                showMessage('Hello! Welcome to MVGraphix! How can I help you today?', 'bot');
                showQuickReplies(chatbotData.greeting.responses);
            }
            else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
                showMessage('You\'re welcome! Is there anything else I can help you with?', 'bot');
                showQuickReplies(['Yes, I have more questions', 'No, that\'s all']);
            }
            else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
                showMessage('Thank you for visiting MVGraphix! Feel free to reach out anytime. Goodbye! 👋', 'bot');
                setTimeout(() => {
                    container.classList.remove('active');
                }, 2000);
            }
            else {
                // Fallback response when chatbot doesn't understand
                showMessage('I\'m sorry, I didn\'t quite understand that. Try asking about our services, pricing, portfolio, or contact information!', 'bot');
                showQuickReplies(['What services do you offer?', 'How much do your services cost?', 'How can I contact you?', 'Do you have a portfolio?']);
            }
        }

        function handleQuickReply(reply) {
            showMessage(reply, 'user');

            switch (reply.toLowerCase()) {
                case 'what services do you offer?':
                    currentState = 'services';
                    showMessage(chatbotData.services.question, 'bot');
                    showQuickReplies(chatbotData.services.responses);
                    break;

                case 'graphic design':
                    currentState = 'graphic_design';
                    showMessage(chatbotData.graphic_design.question, 'bot');
                    showMessage(chatbotData.graphic_design.response, 'bot');
                    showQuickReplies(chatbotData.graphic_design.followup);
                    break;

                case 'software development':
                    currentState = 'software_development';
                    showMessage(chatbotData.software_development.question, 'bot');
                    showMessage(chatbotData.software_development.response, 'bot');
                    showQuickReplies(chatbotData.software_development.followup);
                    break;

                case '3d house plans':
                    currentState = '3d_plans';
                    showMessage(chatbotData['3d_plans'].question, 'bot');
                    showMessage(chatbotData['3d_plans'].response, 'bot');
                    showQuickReplies(chatbotData['3d_plans'].followup);
                    break;

                case 'how much do your services cost?':
                case 'pricing':
                    currentState = 'pricing';
                    showMessage(chatbotData.pricing.question, 'bot');
                    showMessage(chatbotData.pricing.response, 'bot');
                    showQuickReplies(chatbotData.pricing.followup);
                    break;

                case 'how can i contact you?':
                case 'contact':
                    currentState = 'contact';
                    showMessage(chatbotData.contact.question, 'bot');
                    showMessage(chatbotData.contact.response, 'bot');
                    showQuickReplies(chatbotData.contact.followup);
                    break;

                case 'do you have a portfolio?':
                case 'portfolio examples':
                case 'portfolio':
                    currentState = 'portfolio';
                    showMessage(chatbotData.portfolio.question, 'bot');
                    showMessage(chatbotData.portfolio.response, 'bot');
                    showQuickReplies(chatbotData.portfolio.followup);
                    break;

                case 'back to services':
                    currentState = 'services';
                    showMessage(chatbotData.services.question, 'bot');
                    showQuickReplies(chatbotData.services.responses);
                    break;

                case 'back to main menu':
                    currentState = 'greeting';
                    showMessage(chatbotData.greeting.question, 'bot');
                    showQuickReplies(chatbotData.greeting.responses);
                    break;

                case 'schedule consultation':
                case 'send message':
                    showMessage('Great! Please use our contact form below to send us a message and we\'ll get back to you shortly.', 'bot');
                    setTimeout(() => {
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 1000);
                    showQuickReplies(['Back to Main Menu']);
                    break;

                case 'view portfolio':
                    showMessage('Taking you to our portfolio section...', 'bot');
                    setTimeout(() => {
                        document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }, 1000);
                    showQuickReplies(['Back to Services']);
                    break;

                case 'get quote':
                    showMessage('Please use our contact form below to request a custom quote for your project.', 'bot');
                    setTimeout(() => {
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 1000);
                    showQuickReplies(['Back to Services']);
                    break;

                case 'yes, i have more questions':
                    showMessage('Great! What else would you like to know?', 'bot');
                    showQuickReplies(chatbotData.greeting.responses);
                    break;

                case 'no, that\'s all':
                    showMessage('Thank you for your interest in MVGraphix! Feel free to reach out anytime. Have a great day! 😊', 'bot');
                    setTimeout(() => {
                        container.classList.remove('active');
                    }, 2000);
                    break;

                default:
                    showMessage('I\'m here to help! How can I assist you today?', 'bot');
                    showQuickReplies(chatbotData.greeting.responses);
            }
        }
    }

    // Create and initialize chatbot
    createChatbot();
});
