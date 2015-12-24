function Panel ()
{
    this.width = canvas.width;
    this.height = canvas.height/15;
    this.draw= function(ctx)
    {
        ctx.fillStyle='#000066';
        ctx.fillRect(0,0,this.width,this.height);
    }
}