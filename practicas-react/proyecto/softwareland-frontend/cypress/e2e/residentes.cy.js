describe('Suite de Pruebas para CRUD de Residentes', () => {
  const residenteDePrueba = {
    nombre: 'Carlos',
    apellido: 'Lopez',
    telefono: '5512345678',
    correo: 'carlos.lopez@test.com',
    instituto: 'Instituto de Pruebas',
    nombreActualizado: 'Carlos Alberto'
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000/residentes');
    // Nos aseguramos que la tabla inicial cargue antes de continuar.
    cy.contains('Cargando…').should('not.exist');
  });

  it('debe mostrar la tabla de residentes al cargar la página', () => {
    cy.contains('h1', 'Residentes de Softwareland').should('be.visible');
    cy.get('table').should('be.visible');
  });

  it('no debe permitir enviar el formulario de nuevo residente con datos inválidos', () => {
    cy.contains('a', 'Nuevo').click();
    cy.contains('h1', 'Nuevo Residente').should('be.visible');
    
    cy.contains('button', 'Guardar').click();
    
    cy.contains('• Requerido').should('be.visible');
    
    cy.get('input[name="telefono"]').type('123');
    cy.contains('button', 'Guardar').click();
    cy.contains('• 10 dígitos').should('be.visible');
  });

  it('debe completar el flujo CRUD: Crear, Ver, Editar y Borrar un residente', () => {
    // --- CREAR ---
    cy.contains('a', 'Nuevo').click();
    cy.contains('h1', 'Nuevo Residente').should('be.visible');

    cy.get('input[name="nombre"]').type(residenteDePrueba.nombre);
    cy.get('input[name="apellido"]').type(residenteDePrueba.apellido);
    cy.get('select[name="genero"]').select('Masculino');
    cy.get('input[name="fecha_nacimiento"]').type('2001-05-15');
    cy.get('input[name="telefono"]').type(residenteDePrueba.telefono);
    cy.get('input[name="correo"]').type(residenteDePrueba.correo);
    cy.get('input[name="instituto"]').type(residenteDePrueba.instituto);
    cy.get('select[name="carrera"]').select('Ingenieria en Sistemas Computacionales');
    cy.get('input[name="lpython"]').check();
    cy.contains('button', 'Guardar').click();

    // 1. Verificamos que la URL cambió.
    cy.url().should('include', '/residentes');
    // 2. Esperamos a que el indicador de "Cargando..." desaparezca.
    //    Esto nos asegura que la petición a la API terminó y React ya actualizó la vista.
    cy.contains('Cargando…').should('not.exist');
    // 3. AHORA, con la certeza de que todo está cargado, buscamos el resultado.
    cy.contains('td', residenteDePrueba.correo)
      .parent('tr')
      .should('contain', `${residenteDePrueba.nombre} ${residenteDePrueba.apellido}`);

    // --- VER ---
    cy.contains('td', residenteDePrueba.correo).parent('tr').within(() => {
      cy.get('button').first().click();
    });
    cy.get('.bg-white.rounded-lg').should('be.visible');
    cy.contains('h2', `${residenteDePrueba.nombre} ${residenteDePrueba.apellido}`).should('be.visible');
    cy.contains('button', 'Cerrar').click();

    // --- EDITAR ---
    cy.contains('td', residenteDePrueba.correo).parent('tr').within(() => {
      cy.get('a').click();
    });
    cy.contains('h1', /Editar Residente #\d+/).should('be.visible');

    cy.get('input[name="nombre"]').clear().type(residenteDePrueba.nombreActualizado);
    cy.contains('button', 'Guardar cambios').click();
    
    cy.url().should('include', '/residentes');
    cy.contains('Cargando…').should('not.exist');
    cy.contains('td', residenteDePrueba.correo)
      .parent('tr')
      .should('contain', `${residenteDePrueba.nombreActualizado} ${residenteDePrueba.apellido}`);

    // --- BORRAR ---
    cy.contains('td', residenteDePrueba.correo).parent('tr').within(() => {
      cy.get('button').last().click();
    });
    cy.get('.swal2-popup').should('be.visible');
    cy.contains('.swal2-confirm', 'Sí, ¡bórralo!').click();

    cy.contains('Cargando…').should('not.exist');
    cy.contains('td', residenteDePrueba.correo).should('not.exist');
  });
});
