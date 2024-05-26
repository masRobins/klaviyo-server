const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    
    if (event.httpMethod === 'OPTIONS') {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Length': '0'
          },
          body: '',
        };
      }

  const { email } = JSON.parse(event.body);

  const API_KEY = 'pk_9cb68a0da46aff9a73892b1012cc6e0286';
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
