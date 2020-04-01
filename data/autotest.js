
export class Question {

    /**
     * 
     * @param {String} question 
     * @param {Array<String>} suggestions 
     * @param {Array<Question>} nextQuestions 
     * @param {Function} fonctionDetermnineQuestionSuivante
     */
    constructor(question, suggestions, notes, nextQuestions, fonctionDetermnineQuestionSuivante){
        this.question = question;
        this.reponse = null;
        this.suggestions = suggestions;
        this.nextQuestions = nextQuestions;
        this.indexquestionSuivante = 0;
        this.notes = notes;
        this.fonctionDetermnineQuestionSuivante = fonctionDetermnineQuestionSuivante;
    }

    aUneQuestionSuivante(){
        if(this.fonctionDetermnineQuestionSuivante == null){
            return false;
        }
        const indexQuestionSuivante = this.fonctionDetermnineQuestionSuivante(this.reponse);
        return this.nextQuestions !== null || (this.reponse != null && this.nextQuestions[indexQuestionSuivante].reponse != null);
    }

    getNote(){
        console.log(this.notes);
        console.log(this.reponse);
        return this.notes[this.reponse];
    }

    getQuestionSuivante(){
        if(this.fonctionDetermnineQuestionSuivante != null){
            const indexQuestionSuivante = this.fonctionDetermnineQuestionSuivante(this.reponse);
            console.log("Question suivante index : " + indexQuestionSuivante);
            if(indexQuestionSuivante >= 0){
                return this.nextQuestions[indexQuestionSuivante];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

export class AutoTest {
    /**
     * 
     * @param {Array<Question>} questions 
     * @param {Number} indexQuestionCourante
     */
    constructor(questions){
        this.questions = questions;
        this.indexQuestionCourante = 0;
        this.question = questions[this.indexQuestionCourante];
    }


    /**
     * Return la question à laquelle l'utilisateur doit répondre
     * @returns {Question} 
     */
    getQuestionCourante(){
        return this.question;
    }

    /**
     * @return {Boolean}
     */
    estFini(){
        console.log(this.questions.length + ' ' + this.indexQuestionCourante);
        return this.questions.length <= this.indexQuestionCourante;
    }

    questionSuivante(){
        const questionCourante = this.getQuestionCourante();
        if(questionCourante.aUneQuestionSuivante()){
            this.question = questionCourante.getQuestionSuivante();
            if(this.question == null){
                return this.allerALaQuestionSuivante();
            } else {
                return true;
            }
        } else {
            return this.allerALaQuestionSuivante();
        }
    }

    allerALaQuestionSuivante(){
        this.indexQuestionCourante++;
        if(this.estFini() == false){
            this.question = this.questions[this.indexQuestionCourante];
            return true;
        } else {
            return false;
        }
    }
}