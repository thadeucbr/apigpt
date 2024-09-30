import { describe, it, expect, vi } from 'vitest';
import aiRepository from './ai.repository.js';
import * as models from '../model/index.js';

vi.mock('../model/index.js'); // Mockando o módulo de modelos

describe('aiRepository', () => {
  const modelName = 'User'; // Substitua pelo nome do seu modelo
  const query = { name: 'Test' };
  
  afterEach(() => {
    vi.clearAllMocks(); // Limpa mocks após cada teste
  });

  it('should create a document', async () => {
    const mockDocument = { save: vi.fn().mockResolvedValue(query) };
    models[modelName].mockImplementation(() => mockDocument);
    
    const result = await aiRepository({ model: modelName, query, transaction: 'create' });
    
    expect(models[modelName]).toHaveBeenCalledWith(query);
    expect(mockDocument.save).toHaveBeenCalled();
    expect(result).toEqual(query);
  });

  it('should find documents', async () => {
    const mockFind = { exec: vi.fn().mockResolvedValue([query]) };
    models[modelName].find.mockReturnValue(mockFind);
    
    const result = await aiRepository({ model: modelName, query, transaction: 'find' });
    
    expect(mockFind.exec).toHaveBeenCalled();
    expect(result).toEqual([query]);
  });

  it('should find a single document', async () => {
    const mockFindOne = { exec: vi.fn().mockResolvedValue(query) };
    models[modelName].findOne.mockReturnValue(mockFindOne);
    
    const result = await aiRepository({ model: modelName, query, transaction: 'findOne' });
    
    expect(mockFindOne.exec).toHaveBeenCalled();
    expect(result).toEqual(query);
  });

  it('should update a document', async () => {
    const mockUpdateOne = { exec: vi.fn().mockResolvedValue({ nModified: 1 }) };
    models[modelName].updateOne.mockReturnValue(mockUpdateOne);
    
    const updateQuery = { filter: { _id: '1' }, update: { name: 'Updated Test' } };
    const result = await aiRepository({ model: modelName, query: updateQuery, transaction: 'update' });
    
    expect(models[modelName].updateOne).toHaveBeenCalledWith(updateQuery.filter, updateQuery.update);
    expect(mockUpdateOne.exec).toHaveBeenCalled();
    expect(result).toEqual({ nModified: 1 });
  });

  it('should delete a document', async () => {
    const mockDeleteOne = { exec: vi.fn().mockResolvedValue({ deletedCount: 1 }) };
    models[modelName].deleteOne.mockReturnValue(mockDeleteOne);
    
    const result = await aiRepository({ model: modelName, query, transaction: 'delete' });
    
    expect(models[modelName].deleteOne).toHaveBeenCalledWith(query);
    expect(mockDeleteOne.exec).toHaveBeenCalled();
    expect(result).toEqual({ deletedCount: 1 });
  });

  it('should throw an error for invalid transaction type', async () => {
    const result = await aiRepository({ model: modelName, query, transaction: 'invalid' });
    expect(result).toEqual({ "message": "Invalid transaction type", "status": "error" });
  });
  
  it('should throw an error for invalid model', async () => {
    const result = await aiRepository({ model: 'InvalidModel', query, transaction: 'find' });
    expect(result).toEqual({ "message": "Invalid model", "status": "error" });
  });
});
