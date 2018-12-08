<template>
	<div :class="[containerClassName]">
        <!-- Year -->
		<div :class="[selectWrapperClassName]">
			<select v-model="selectedYear" @change="updateDays()" :class="[selectClassName, selectYearClassName]">
				<option v-for="year in years" :key="year.year" :value="year.year">
					{{ year.year }}년
				</option>
			</select>
		</div>

        <!-- Month -->
		<div :class="[selectWrapperClassName]">
			<select v-model="selectedMonth" @change="updateDays()" :class="[selectClassName, selectMonthClassName]">
				<option v-for="(month, index) in months" :value="index" :key="month.month">
					{{ month.month }}월
				</option>
			</select>
		</div>

		<!-- Day -->
		<div :class="[selectWrapperClassName]">
			<select v-model="selectedDay" :class="[selectClassName, selectDayClassName]">
				<option v-for="day in days" :key="day.day" :value="day.day">
					{{ day.day }}일
				</option>
			</select>
		</div>
	</div>
</template>

<script>
	const defaultMonths = {
		0: '1',
		1: '2',
		2: '3',
		3: '4',
		4: '5',
		5: '6',
		6: '7',
		7: '8',
		8: '9',
		9: '10',
		10: '11',
		11: '12'
	}
	export default {
		name: "DateDropdown",
		props: {
			default: {
				type: String,
				required: false
			},
			min: {
				type: String,
				required: false
			},
			max: {
				type: String,
				required: false
			},
			monthsNames: {
				type: String,
				required: false
			},
			selectClassName: {
				type: String,
				required: false,
				default: 'date-dropdown-select'
			},
			selectDayClassName: {
				type: String,
				required: false,
				default: 'day'
			},
			selectMonthClassName: {
				type: String,
				required: false,
				default: 'month'
			},
			selectYearClassName: {
				type: String,
				required: false,
				default: 'year'
			},
			selectWrapperClassName: {
				type: String,
				required: false,
				default: 'date-dropdown-select-wrapper'
			},
			containerClassName: {
				type: String,
				required: false,
				default: 'date-dropdown-container'
			},
		},
		data () {
			return {
				days: [],
				selectedDay: '',
				selectedMonth: '',
				selectedYear: ''
			}
		},
		computed: {
			// Returns if there are default date settings.
			initialDate() {
				return !! (this.default || this.min)
			},
			// The date property, converted to a date.
			specifiedDate() {
				return new Date(this.default)
			},
			// The minimum date the will allow user to select.
			minDate() {
				if (this.min)
					return new Date(this.min)
				return
			},
			// The maximum date the will allow user to select.
			maxDate() {
				if (this.max)
					return new Date(this.max)
				return
			},
			// Returns a formatted date e.g. 01.02.2018.
			calculatedDate() {
				const day = this.selectedDay >= 10 ? this.selectedDay : `0${this.selectedDay}`
				const month = this.selectedMonth + 1 >= 10 ? this.selectedMonth + 1 : `0${this.selectedMonth + 1}`
				return `${this.selectedYear}-${month}-${day}`
			},
			// The alternative names of months
			dividedNamesOfMonths() {
				if (this.monthsNames)
					return this.monthsNames.replace(/\s/g, '').split(',')
				return
			},
			// Computes a list of month.
			months() {
				let months = []
				for (let i = 0; i < 12; i++) {
					if (this.dividedNamesOfMonths)
						months.push(this.dividedNamesOfMonths[i])
					else
						months.push(defaultMonths[i])
				}
				return months.map((month, index) => {
					return { month, selected: index === this.selectedMonth }
				})
			},
			// Computes a list of years.
			years() {
				// Set the first year of the array.
				let firstYear
				if (this.min) {
					firstYear = this.minDate.getFullYear()
				} else if (this.default) {
					firstYear = this.specifiedDate.getFullYear()
				} else {
					firstYear = (new Date).getFullYear()
				}
				// Create a range of years to loop through which is either the maximum
				// date minus the first year, or simply 100.
				let through = this.max ? (this.maxDate.getFullYear() + 1) - firstYear : 101
				let years = []
				for (let i = firstYear, len = firstYear + through; i < len; i++)
					years.push(i)
				return years.map((year) => {
					return { year, selected: year === this.selectedYear }
				})
			}
		},
		methods: {
			getDays() {
				let days = []
				let daysNumberOfMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate()
				for (let i = 1; i < daysNumberOfMonth + 1; i++)
					days.push(i)
				return days.map((day) => {
					return { day, selected: days === this.selectedDay }
				})
			},
			updateDays() {
				this.days = this.getDays()
			},
			// Send data to upper component.
			sendDate() {
				const date = this.format ? this.format(this.calculatedDate) : this.calculatedDate
				this.$emit('input', date)
			},
			// Set the initial date.
			setDate() {
				this.updateDays()
				// If a value property has been passed to the component, that will be
				// used instead of the current day.
				let date
				if (this.min && this.max && !this.default) {
					date = new Date(this.min)
				} else if (this.default) {
					date = new Date(this.default)
				} else {
					date = new Date()
				}
				if (this.initialDate)
					this.selectedDay = date.getDate() + 1
				else
					this.selectedDay = date.getDate()
				this.selectedDay = date.getDate()
				this.selectedMonth = date.getMonth()
				this.selectedYear = date.getFullYear()
				this.sendDate()
			}
		},
		created() {
			// Set the date when the component was created
			this.setDate()
		},
		updated() {
			// Send the data on change
			this.sendDate()
		},
	}
</script>

<style scoped>
	.date-dropdown-container {
        display: inline-flex;
        width: calc(100% - 132px);
	}
	.date-dropdown-select {
		display: inline-block;
		border: 1px solid #e0e0e0;
		border-radius: 3px;
        margin-right: 10px;
        padding: 4px 0px 4px 4px;
	}
</style>