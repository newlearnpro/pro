function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6ZXKCM3CYUm":
        Script1();
        break;
      case "6bKJ2yAkG78":
        Script2();
        break;
  }
}

function Script1()
{
   parent.document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
}

function Script2()
{
  parent.document.getElementsByClassName("lesson_selected")[0].parentElement.previousElementSibling.firstElementChild.click();
}

