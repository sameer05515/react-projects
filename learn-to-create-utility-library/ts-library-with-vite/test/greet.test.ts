import { describe, it, expect } from 'vitest';
import { greet } from "../src/lib/index";

describe('greet', () => {
    it('should return a greeting message', () => {
      const result = greet('World');
      expect(result).toBe('Hello, World!');
    });
  
    it('should handle empty strings', () => {
      const result = greet('');
      expect(result).toBe('Hello, !');
    });
  });

