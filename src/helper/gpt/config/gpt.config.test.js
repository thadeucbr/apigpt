import { describe, it, expect, vi } from 'vitest';
import gpt from './gpt.config.js';
import OpenAI from 'openai';

vi.mock('openai');

describe('gpt', () => {
  const mockCompletion = [{ role: 'user', content: 'Hello, how are you?' }];
  const mockResponse = {
    choices: [
      {
        message: {
          content: 'I am fine, thank you!',
          tool_calls: [],
        },
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct message from OpenAI', async () => {
    OpenAI.mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue(mockResponse),
          },
        },
      };
    });

    const result = await gpt({ completion: mockCompletion });

    expect(OpenAI).toHaveBeenCalledWith({ apiKey: process.env.OPENAI_API_KEY });
    expect(result).toEqual(mockResponse.choices[0].message);
  });

  it('should log tool calls if they exist', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    mockResponse.choices[0].message.tool_calls = [{ tool: 'tool1', args: {} }];

    OpenAI.mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue(mockResponse),
          },
        },
      };
    });

    await gpt({ completion: mockCompletion });

    expect(consoleLogSpy).toHaveBeenCalledWith(mockResponse.choices[0].message.tool_calls);
    consoleLogSpy.mockRestore();
  });

  it('should return error message when an error occurs', async () => {
    const errorMessage = 'API request failed';
    OpenAI.mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: vi.fn().mockRejectedValue(new Error(errorMessage)),
          },
        },
      };
    });

    const result = await gpt({ completion: mockCompletion });

    expect(result).toEqual(errorMessage);
  });
});
