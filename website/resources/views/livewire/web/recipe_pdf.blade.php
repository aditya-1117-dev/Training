<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Recipe</title>

    <style>
        .wraper{
           max-width :95%;
            min-height: 100vh;
            padding: 50px;

        }
        .title_row{
            width: 100%;
            display: flex;
            flex-direction: column
        }
        .mb-3{
            margin-bottom: 25px;
        }
        .content_row{
            width: 100%;
            display: flex;
            justify-content: space-between
            gap: 5px;
        }
        .col{
            padding: 10px 15px;
            width: 45%;
            border: 1px solid gray;
            border-radius: 10px;
        }
        ul{
            list-style: none;
            width:100%;

        }
        li{
            line-height: 1rem;
            color: black;
            font-size: 18px;
            margin-bottom: 10px
        }
        .title{
            font-size: 22px;
            color: black;
            width: 100%;

        }
        .sub_title{
            font-size: 20px;
            color: black;
        }
        p{
            width:100%;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="wraper">
        <div class="title_row  mb-3">
            <h2 class="title">Recipe</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ad rem nobis fuga voluptatem! Distinctio laborum libero at alias vel ut, nam repellendus aperiam, amet laudantium repudiandae enim similique facilis?</p>
        </div>
        <div class="content_row">
            <div class="col">
                <h3 class="sub_title">Ingredents</h3>
                <ul>
                    <li>one</li>
                    <li>one</li>
                    <li>one</li>
                    <li>one</li>
                    <li>one</li>
                </ul>
            </div>
            <div class="col">
                <h3 class="sub_title">Ingredents</h3>
                <ul>
                    <li>one</li>
                    <li>one</li>
                    <li>one</li>
                    <li>one</li>
                    <li>one</li>
                </ul>
            </div>

        </div>
        <div class="title_row  mb-3">
            <h5 class="title">By: Cooking Ticket</h5>
            <p>Follow us on: youtube.com facebook.com</p>
        </div>
    </div>
</body>
</html>
