  // Prueba 3: Listar Usuarios (Ruta protegida)


  // Prueba 4: Obtener un usuario por ID inexistente (404)


  // ==========================================
  // MÓDULO: POSTULACIONES
  // ==========================================




  // ==========================================
  // MÓDULO: NOTICIAS
  // ==========================================

  // Prueba 6: Crear Noticia exitosamente
  describe('POST /api/noticias', () => {
    it('Debería crear una noticia correctamente si los datos son válidos', async () => {
      const noticiaPayload = {
        titulo: 'La empresa inaugura nueva sede',
        contenido: 'La empresa anuncia la apertura de una nueva sede...',
        imagen: 'https://cdn.libero.com/noticias/sede.jpg'
      };

      await request(mockServerUrl)
        .post('/api/noticias')
        .set('Authorization', mockToken)
        .send(noticiaPayload)
        .expect(201);
    });
  });

  // Prueba 7: Actualizar parcialmente una Noticia (PATCH)
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
