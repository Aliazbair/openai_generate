import { Configuration, OpenAIApi } from 'openai';

// create config

const config = new Configuration({
  apiKey: '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',
});

// INIT OPENAI
const openai = new OpenAIApi(config);

export const generatIemage = async (req, res) => {
  //   get prompt and size from body
  const { prompt, size } = req.body;
  //   create image size
  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  // make req
  try {
    const response = await openai.createImage({
      prompt,
      n: 2,
      size: imageSize,
    });

    // get the response with image url
    const imageUrl = response.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};
