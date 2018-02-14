module.exports.initChat = function(application, request, response){
    var formData = request.body;
    request.assert('apelido', 'You need to inform a nickname!').notEmpty();
    request.assert('apelido', 'Nickname must have from 3 to 15 characters').len(3, 15);

    var errors = request.validationErrors();
    if(errors){
        response.render('index', {validation: errors});
        return;
    }
    application.get('io').emit(
        'msgToClient', 
        {apelido: formData.apelido, mensagem: " just got into the chat"}
    );

    response.render('chat', {formData: formData});
}