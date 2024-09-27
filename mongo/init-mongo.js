// Conecta ao banco de dados 'database'
db = db.getSiblingDB('database');

// Insere email_templates
const email_templates = [
    {
        _id: ObjectId("65a7b9c83f2d1e4b8c0f2d3e"),
        subject: "Bem-vindo ao nosso serviço!",
        templateBody: "<html><body><h1>Olá, {{name}}!</h1><p>Obrigado por se cadastrar no nosso serviço.</p><p>Atenciosamente,<br>{{marca}}</p></body></html>",
        parameters: ["name", "marca"]
    },
    {
        _id: ObjectId("65a7b9c83f2d1e4b8c0f2d3f"),
        subject: "Confirmação de Pedido",
        templateBody: "<html><body><h1>Pedido Confirmado</h1><p>Olá {{name}},</p><p>Seu pedido #{{orderNumber}} foi confirmado e está sendo processado.</p><p>Obrigado pela sua compra!</p><p>Atenciosamente,<br>{{marca}}</p></body></html>",
        parameters: ["name", "orderNumber", "marca"]
    },
    {
        _id: ObjectId("65a7b9c83f2d1e4b8c0f2d40"),
        subject: "Recuperação de Senha",
        templateBody: "<html><body><h1>Recuperação de Senha</h1><p>Olá {{name}},</p><p>Você solicitou a recuperação de senha. Use o token abaixo para redefinir sua senha:</p><p><strong>{{resetToken}}</strong></p><p>Se você não solicitou esta alteração, por favor ignore este e-mail.</p><p>Atenciosamente,<br>{{marca}}</p></body></html>",
        parameters: ["name", "resetToken", "marca"]
    },
    {
        _id: ObjectId("65a7b9c83f2d1e4b8c0f2d41"),
        subject: "Promoção Especial",
        templateBody: "<html><body><h1>Oferta Exclusiva para Você!</h1><p>Olá {{name}},</p><p>Temos uma promoção especial só para você! Use o código {{promoCode}} e ganhe {{discount}}% de desconto em sua próxima compra.</p><p>Aproveite esta oferta limitada!</p><p>Atenciosamente,<br>{{marca}}</p></body></html>",
        parameters: ["name", "promoCode", "discount", "marca"]
    },
    {
        _id: ObjectId("65a7b9c83f2d1e4b8c0f2d42"),
        subject: "Lembrete de Carrinho Abandonado",
        templateBody: "<html><body><h1>Você esqueceu algo?</h1><p>Olá {{name}},</p><p>Notamos que você deixou alguns itens no seu carrinho. Que tal finalizar sua compra agora?</p><p>Clique <a href='{{cartLink}}'>aqui</a> para retornar ao seu carrinho.</p><p>Atenciosamente,<br>{{marca}}</p></body></html>",
        parameters: ["name", "cartLink", "marca"]
    }
];
db.email_templates.insertMany(email_templates);
