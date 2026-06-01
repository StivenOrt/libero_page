import request from 'supertest';
import { expect } from 'chai';

const mockServerUrl = 'http://localhost:75'; 
const mockToken = 'Bearer eyJhbGci...';

  describe('PATCH /api/noticias/{id}', () => {
    it('Debería actualizar los campos provistos de una noticia existente', async () => {
      const targetId = 1;
      const updatePayload = {
        titulo: 'Título Modificado en Test'
      };

      await request(mockServerUrl)
        .patch(`/api/noticias/${targetId}`)
        .set('Authorization', mockToken)
        .send(updatePayload)
        .expect(200);
    });
  });
