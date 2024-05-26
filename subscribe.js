const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { email } = JSON.parse(event.body);

  const API_KEY = 'XS7L7P';
  const LIST_ID = 'V89NB9';

  const data = {
    profiles: [{ email: email }]
  };

  try {
    const response = await fetch(`https://a.klaviyo.com/api/v2/list/${LIST_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Klaviyo-API-Key ${API_KEY}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        body: JSON.stringify(errorData),
      };
    }

    const responseData = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscription successful!', data: responseData }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};