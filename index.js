const _URL = window.URL || window.webkitURL;

const ic = document.getElementById("inpCard");
const pca = document.getElementById("postCard");
const fi = document.getElementById("fileInp");
const pi = document.getElementById("postImg");
const pc = document.getElementById("postCnv");
const ui = document.getElementById("userInp");
const upi = document.getElementById("upvotesInp");
const createBtn = document.getElementById("createBtn");
const lb = document.getElementById("loadingBar");
const ft = document.getElementById("footer");


function onCreateClick()
{
    if (fi.files[0] != undefined)
    {
        ic.classList.add("customHide");
        ft.classList.add("customHide");
        lb.innerHTML = '<strong>Creating post...</strong><div class="spinner-border ml-auto text-success" role="status" aria-hidden="true"></div>';

        let imgurl = _URL.createObjectURL(fi.files[0]);
        let img = new Image();

        img.onload = function ()
        {
            _URL.revokeObjectURL(imgurl);

            pc.width = this.width;
            let h = this.height + Math.floor(this.height * (6.6 / 99));
            pc.height = h;

            let ctx = pc.getContext("2d");

            ctx.drawImage(this, 0, 0);

            ctx.fillStyle = "#1776d0";
            ctx.fillRect(0, this.height, this.width, h);

            let rimg = new Image();

            rimg.onload = function ()
            {
                let ix = Math.round(this.width * 0.0157407407);
                let iy = Math.round((h - Math.round((h - img.height) * 0.7222222222)) - (0.1388888889 * (h - img.height)));
                let iw = Math.round((h - img.height) * 0.7222222222);
                let ih = Math.round((h - img.height) * 0.7222222222);

                ctx.drawImage(rimg, ix, iy, iw, ih);

                let ts = Math.round(ih / 1.5);
                let tx = ix + iw + Math.round(iw / 7);
                let ty = iy + Math.floor(ih / 2);
                let tt = "u/" + ui.value;

                ctx.fillStyle = "white";
                ctx.font = "bold " + ts + "px Arial";
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";
                ctx.fillText(tt, tx, ty);


                let uimg = new Image();

                uimg.onload = function ()
                {
                    let ux = pc.width - ix - iw;
                    let uy = iy;
                    let uw = iw - Math.floor(iw / 80);
                    let uh = ih - Math.floor(ih / 80);

                    let uts = ts;
                    let utx = ux - Math.round(uw / 7);
                    let uty = uy + Math.floor(uh / 2);
                    let utt = upi.value;

                    ctx.drawImage(uimg, ux, uy, uw, uh);

                    ctx.font = "bold " + uts + "px Arial";
                    ctx.textAlign = "right";
                    ctx.textBaseline = "middle";
                    ctx.fillText(utt, utx, uty);

                    lb.innerHTML = 'Post created successfully!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>';
                    lb.className = "alert alert-success alert-dismissible fade show";

                    pca.classList.remove("customHide");
                    ft.classList.remove("footerFix");

                    let postImgURL = pc.toDataURL("image/png");
                    pi.src = postImgURL;
                }

                uimg.src = "upvote.png";
            }

            rimg.src = "reddit.png";
        }

        img.src = imgurl;
    }
}

createBtn.onclick = onCreateClick;
