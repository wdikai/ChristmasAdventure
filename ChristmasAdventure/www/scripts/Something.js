function GameObject(type,width,height,x,y,image,speed,spritespeed)
{
	this.width = width;
	this.height = height;
	this.image = image;
	this.type = type;
	this.x = x;
	this.y = y;
	this.speed = speed || 1;
	this.spritespeed = spritespeed||5;
	this.counter = 0;
	this.sprite = new Sprite(this.image,[this.x,this.y],[0, 0], [this.width, this.height], this.spritespeed, [0, 1, 2]);
	this.update = function(dt,move,height)
	{
        var move = move|| 'norm';
        var height = height || 50;
        if (this.type == "Ball") {
            this.sprite.entity_pos[0] = this.sprite.entity_pos[0] + this.speed;
        }
        else if(move == 'norm')
        {
		this.sprite.entity_pos[0] = this.sprite.entity_pos[0] - this.speed;
        }
        else if(move == 'sin')
        {
                var increase = Math.PI/100;
                this.sprite.entity_pos[0] = this.sprite.entity_pos[0] - this.speed;
                this.sprite.entity_pos[1] = Math.asin(this.counter)*120+this.y;
                this.counter += 0.1;
        }
        if (this.type != "Ice" && this.type != "Monster"){
			this.sprite.update(dt);
        }
	}
	this.draw = function(ctx)
	{
		this.sprite.render(ctx);
	}
}