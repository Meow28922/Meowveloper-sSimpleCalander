function dom(element) {
	if (document.querySelectorAll(element).length === 1) {
		return document.querySelectorAll(element)[0];
	} else {
		return document.querySelectorAll(element);
	}
}
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

let today = new Date();
//----------------------------------

function mainFunction(today) {
	dom(".monthTitle").innerHTML = months[today.getMonth()];
	dom(".yearTitle").innerHTML = today.getFullYear();

	dom(".daysContainer").innerHTML = "";

	for (
		let i = 1;
		i <= new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
		i++
	) {
		dom(".daysContainer").innerHTML += `
            <div class="days">
                <div>${i}</div>
                <div>${days[
			new Date(today.getFullYear(), today.getMonth(), i).getDay()
			]
			}</div>
            </div>
        `;
	}

	if (
		dom(".yearTitle").innerHTML == new Date().getFullYear() &&
		dom(".monthTitle").innerHTML == months[new Date().getMonth()]
	) {
		dom(".days>div:first-child").forEach((element) => {
			if (element.innerHTML == new Date().getDate()) {
				element.classList.add("active");
			}
		});
	}
}

window.addEventListener("load", () => {
	today.setFullYear(new Date().getFullYear());
	today.setMonth(new Date().getMonth());
	mainFunction(today);
});

dom("#next").addEventListener("click", () => {
	let month = today.getMonth();
	let year = today.getFullYear();
	if (month === 11) {
		today.setFullYear(year + 1);
		today.setMonth(0, 1);
		mainFunction(today);
	} else {
		today.setMonth(month + 1, 1);
		mainFunction(today);
	}
});

dom("#previous").addEventListener("click", () => {
	let month = today.getMonth();
	let year = today.getFullYear();
	if (month === 0) {
		today.setFullYear(year - 1);
		today.setMonth(11, 1);
		mainFunction(today);
	} else {
		today.setMonth(month - 1, 1);
		mainFunction(today);
	}
});

dom("#today").addEventListener("click", () => {
	today.setFullYear(new Date().getFullYear());
	today.setMonth(new Date().getMonth());
	mainFunction(today);
});

function addzero(num) {
	if (num < 10) {
		return `0${num}`;
	} else {
		return `${num}`;
	}
}

dom(".formatToggle").addEventListener("click", () => {
	if (dom(".formatToggle").classList.contains("not24Hour")) {
		dom(".formatToggle").classList.remove("not24Hour");
		dom(".formatToggle>div").style.left = "0%";
	} else {
		dom(".formatToggle").classList.add("not24Hour");
		dom(".formatToggle>div").style.left = "50%";
	}
});

setInterval(() => {
	if (dom(".formatToggle").classList.contains("not24Hour")) {
		if (new Date().getHours() >= 12) {
			dom(".clockContainer").innerHTML = `
                    <div>
                        <p>Current Date & Time</p>
                        <p>${new Date().toLocaleDateString()}</p>
                    </div>
                    <div class="hourMinuteSeconds">
                        ${addzero(new Date().getHours()) - 12} :
                        ${addzero(new Date().getMinutes())} :
                        ${addzero(new Date().getSeconds())} : PM
                    </div>
                `;
		} else {
			dom(".clockContainer").innerHTML = `
                    <div>
                        <p>Current Date & Time</p>
                        <p>${new Date().toLocaleDateString()}</p>
                    </div>
                    <div class="hourMinuteSeconds">
                        ${addzero(new Date().getHours()) - 12} :
                        ${addzero(new Date().getMinutes())} :
                        ${addzero(new Date().getSeconds())} : AM
                    </div>
                `;
		}
	} else {
		dom(".clockContainer").innerHTML = `
                <div>
                    <p>Current Date & Time</p>
                    <p>${new Date().toLocaleDateString()}</p>
                </div>
                <div class="hourMinuteSeconds">
                    ${addzero(new Date().getHours())} :
                    ${addzero(new Date().getMinutes())} : 
                    ${addzero(new Date().getSeconds())}
                </div>

            `;
	}
}, 10);