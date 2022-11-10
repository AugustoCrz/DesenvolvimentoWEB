const request = require("supertest");
const app = require("../app");

describe("Testes para o path 'conta'", () => {
    test("[GET /conta] Lista todas as contas do sistema", async () => {
        const res = await request(app)
            .get("/conta")
            // Especifique na API que o tipo enviado é application/json.
            // Caso contrário o Supertest não será capas de fazer o parse da resposta
            // para um objeto javascript, e consequentemente res.body vira vazio.
            .set('Accept', 'application/json');
        // Espera que o código HTTP seja 200
        expect(res.statusCode).toBe(200);

        // Teste se foi retornado um array
        expect(res.body).toBeInstanceOf(Array);

        // Espera que o objeto retornado contenha os atributos 
        // definidos no schema definido no OpenAPI.
        // Ver em: https://jestjs.io/pt-BR/docs/expect#tohavepropertykeypath-value
        // ---- Testes para ItemPatrimonio
        // Para simplificar, vamos testar apenas o primeiro objeto
        const objToTest = res.body[0];

        expect(objToTest).toHaveProperty("nome");
        expect(objToTest).toHaveProperty("sobrenome");
        expect(res.body).toHaveProperty("identificador");
        expect(objToTest).toHaveProperty("saldo");
    });

    test("[GET /conta/{conta_id}] Recupera uma conta por identificador", async () => {
        const res = await request(app)
            .get("/conta/84234234")
            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 200
        expect(res.statusCode).toBe(200);

        // Espera que o objeto retornado contenha os atributos 
        // definidos no schema definido no OpenAPI.
        // Ver em: https://jestjs.io/pt-BR/docs/expect#tohavepropertykeypath-value
        // ---- Testes para ItemPatrimonio
        // Para simplificar, vamos testar apenas o primeiro objeto
        expect(res.body).toHaveProperty("nome");
        expect(res.body).toHaveProperty("sobrenome");
        expect(res.body).toHaveProperty("identificador");
        expect(res.body).toHaveProperty("saldo");
    });

    test("[POST /conta] Criação de uma nova conta", async () => {
        const res = await request(app)
            .post("/conta", {
                "nome": "João",
                "sobremome": "Gomes",
                "identificador": "29348238492",
                "saldo": 0
            })
            .set("Content-Type", "application/json")
            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 201
        expect(res.statusCode).toBe(201);

        expect(res.body).toEqual({ status: "Conta bancária criada com sucesso." });
    });

    test("[DELETE /conta/{identificador}] Remove uma conta bancária pelo ID", async () => {
        const res = await request(app)
            .delete("/conta/29348238492")
            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 200
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: "Conta encerrada com sucesso." });
    });

    const agent = request.agent(app);

    test("Não retorna objeto pro ID em um GET após executar um DELETE ", async () => {

        // Faz primeiro a requisição DELETE ...        
        const resPOST = await agent
            .delete("/conta/29348238492")
            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 200
        expect(resPOST.statusCode).toBe(200);
        expect(resPOST.body).toEqual({ status: "Conta encerrada com sucesso." });

        // ... Para em seguida fazer um GET e obter um 404.
        const resGET = await agent
            .get("/conta/")
            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 404 - Not Found
        expect(resGET.statusCode).toBe(404);
        expect(resGET.body).toEqual({ status: `Não foi possível encontrar a conta bancaria.` });
    });
});
