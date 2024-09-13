const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector); //стрелка вверх

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) { // если расстояние которое мы уже пролистали (scrollTop) больше чем 1650 пкс 
            upElem.classList.add('animated', 'fadeIn'); //появление стрелки
            upElem.classList.remove('fadeOut'); //удаляем класс который отвечает за скрытие элемента
        } else {
            upElem.classList.add('fadeOut'); //скрываем элемент
            upElem.classList.remove('fadeIn'); //удаляем класс который отвечает за показ элемента
        }
    });

    const element = document.documentElement, 
          body = document.body;

    const calcScroll = () => { //подсчитывает сколько нужно пролистать
        upElem.addEventListener('click', function(event) { //клик на стрелку вверх
            let scrollTop = Math.round(body.scrollTop || element.scrollTop); //определяет пролистанное расстояние. 
                                        // что из этого будет существовать, то и попадет в переменную (body.scrollTop || element.scrollTop)
                                        //так мы обезопасим себя от багов
                if (this.hash !== '') { //если хэш не пустой
                    event.preventDefault();
                    let hashElement = document.querySelector(this.hash), //получаем тот элемент к которому будем скролить страницу
                        hashElementTop = 0; //переменная показывает сколько еще пикселей надо пролистать до родителя этого хэш элемента

                    while (hashElement.offsetParent) { //вычисляем значение переменной с предыдущей строчки. offsetParent - обозначает тот элемент относительно которого будет позицмонироваться hashElement
                        hashElementTop += hashElement.offsetTop; //offsetTop - позволяет определить сколько пикселей осталось до верхней границы родительского элемента от hashElemnt
                        hashElement = hashElement.offsetParent; //перебирает всех родителей которые могут быть основой позиционирования данного элемента
                    } // цикл позволит нам перебрать всех ролителей элемента и узнать сколько пикселей нам нужно будет отлистать

                    hashElementTop = Math.round(hashElementTop); //в случае если количество пикселей дробное
                    smoothScroll(scrollTop, hashElementTop, this.hash); //расстояние которое мы пролистали, 
                                                                        // сколько надо пролиста до родителя хэш элемента и хэш
                }
        });
    };

    const smoothScroll = (from, to, hash) => { // три аргумента: откуда начинаем, куда идем, и хэш
        let timeInterval = 1, // значение через которое будет воспроизводится анимация
            prevScrollTop, //предществуещее значение
            speed; // с какой скоростью будет происходить анимация

        if (to > from) { //если расстояние до родителя элемента больше чем расстояние которое мы пролистали, то скорость = 30
            speed = 30; 
        } else {          // в обратной ситуации скорость = -30
            speed = -30;
        }

        let move = setInterval(function() { //создание функции для интервала
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);  //определяет пролистанное расстояние

            if (
                prevScrollTop === scrollTop || // предыдущая анимация равна той которую мы хотели получить
                (to > from && scrollTop >= to) ||  //если расстояие до родителя элемента больше чем расстояние которое мы пролистали и сколько надо пролистать больше или равно расстоянию до родителя элемента
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move); // если это условие выполнилось, то мы очищаем интервал (значит долистали)
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
            } else {   //чтобы страничка двигалась в нужном направлении с заданной скоростью
                body.scrollTop += speed;   //пролистанное расстояние + скорость
                element.scrollTop += speed; // тоже самое
                prevScrollTop = scrollTop; //узнаем сколько еще осталось пока долистаем до нужного момента
            }
        }, timeInterval);
    };

    calcScroll(); // вызов функции подсчета скрола
};

export default scrolling;